import { CustomInput } from "@/components/CustomInput";
import { CustomModal } from "@/components/CustomModal";

import {
  showNotification,
  showNotificationError,
} from "@/utils/showNotification";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import dayjs from 'dayjs';
import { useUsersStore } from "@/store/useUsersStore";
import { postCreate, postUpdate } from "@/services/post.service";
import { CustomDateTimePicker } from "@/components/CustomDateTimePicker";
import { CustomTextarea } from "../CustomTextarea";
import { setPosts, usePostsStore } from "@/store/usePostSore";

interface PostsModalProps extends IModal {
  isEdit: boolean;
  post: IPost | undefined;
}

export const PostsModal: React.FC<PostsModalProps> = ({
  open,
  onClose,
  isEdit,
  post,
}) => {

  const { posts } = usePostsStore();
  const { currentUser } = useUsersStore();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<IPost>({
    mode: "onSubmit",
    defaultValues: {
      title: isEdit ? post?.title : "",
      content: isEdit ? post?.content : "",
      author: isEdit ? post?.author : "",
      publicationDate: isEdit? dayjs(post?.publicationDate) : ""
    },
  });

  const onSubmit = async (data: Partial<IPost>) => {
    try {
      const postData: Partial<IPost> = {
        title: data.title!,
        content: data.content!,
        author: data.author!,
        publicationDate: data.publicationDate!
      };

      if (!data.title || !data.content || !data.author || !data.publicationDate) {
        showNotification("Todos los campos son requeridos.", "warning");
        return;
      }

      if (!isEdit) {
        let newPost = {} as IPost;
        newPost = await postCreate(postData);
        setPosts([...posts, newPost]);

      } else {
        const selectedPost = post as IPost;

        const result = await postUpdate(selectedPost.id, postData);

        console.log("result", result);

        const editedPost: IPost = {
          ...selectedPost,
          title: data.title!,
          content: data.content!,
          author: data.author!,
          publicationDate: new Date(data.publicationDate!).toDateString()
        };

        const filteredPosts: IPost[] = posts.filter(
          (item) => item.id !== selectedPost.id
        );

        console.log('editedPost',editedPost)
        const newPosts = [...filteredPosts, editedPost];

        newPosts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setPosts(newPosts);
      }

      const message = isEdit
        ? `${post?.title} editado!`
        : "Agregado";

      showNotification(message, "success");

      onClose();
    } catch (err) {
      console.log("Posts Modal", err);

      showNotificationError();
    }
  };

  return (
    <CustomModal
      name={isEdit ? "edit-post-modal" : "add-post-modal"}
      title={isEdit ? "Editar" : "Agregar"}
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      customCss="lg:top-5"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-10 w-full"
      >
        <CustomInput
          control={control}
          id="title"
          label="Titulo"
          errors={errors?.title}
          labelBackground="white"
        />
        <CustomInput
          control={control}
          id="author"
          label="Author"
          errors={errors?.author}
          labelBackground="white"
        />
        <div className="flex flex-col gap-y-2">
          <CustomTextarea
            control={control}
            id="content"
            label="Contenido"
            errors={errors?.content}
          />
        </div>
        <CustomDateTimePicker 
          control={control}
          id="publicationDate" 
          label="Fecha  de pulicación"
        />
        <Button disabled={isSubmitting || !isDirty} type="submit">
          Guardar
        </Button>
      </form>
    </CustomModal>
  );
};
