import { CustomDateTimePicker } from "@/components/CustomDateTimePicker";
import { CustomInput } from "@/components/CustomInput";
import { CustomModal } from "@/components/CustomModal";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { CustomTextarea } from "../CustomTextarea";

interface PostPreviewModal extends IModal {
  post: IPost;
}

export const PostPreviewModal: React.FC<PostPreviewModal> = ({
  open,
  onClose,
  post,
}) => {
  const { control } = useForm<IPost>({
    mode: "onSubmit",
    defaultValues: {
      title: post.title,
      content: post.content,
      author: post.author,
      publicationDate: dayjs(post.publicationDate)
    },
  });

  return (
    <CustomModal
      name="detail-post-modal"
      title="Detalle"
      open={open}
      onClose={onClose}
      customCss="lg:top-5"
    >
      <form className="flex flex-col gap-y-10 w-full">
        <CustomInput
          control={control}
          id="title"
          label="Titulo"
          labelBackground="white"
          disabled={true}
        />
        <CustomInput
          control={control}
          id="author"
          label="Author"
          labelBackground="white"
          disabled={true}
        />
        <CustomTextarea
          control={control}
          id="content"
          label="Contenido"
          disabled={true}
        />
        <CustomDateTimePicker 
          control={control}
          id="publicationDate" 
          label="Fecha  de pulicación"
          disabled={true}
        />
      </form>
    </CustomModal>
  );
};
