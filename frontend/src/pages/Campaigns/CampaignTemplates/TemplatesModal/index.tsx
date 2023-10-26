import { CustomInput } from "@/components/CustomInput";
import { CustomModal } from "@/components/CustomModal";
import { CustomTextarea } from "@/pages/Campaigns/CampaignTemplates/CustomTextarea";
import {
  showNotification,
  showNotificationError,
} from "@/utils/showNotification";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import dayjs from 'dayjs';
import { setTemplates, useTemplatesStore } from "@/store/useTemplatesStore";
import { useUsersStore } from "@/store/useUsersStore";
import { postCreate, postUpdate } from "@/services/post.service";
import { CustomDateTimePicker } from "@/components/CustomDateTimePicker";

interface TemplatesModalProps extends IModal {
  isEdit: boolean;
  template: Template | undefined;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  open,
  onClose,
  isEdit,
  template,
}) => {

  const { templates } = useTemplatesStore();
  const { currentUser } = useUsersStore();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<Template>({
    mode: "onSubmit",
    defaultValues: {
      title: isEdit ? template?.title : "",
      content: isEdit ? template?.content : "",
      author: isEdit ? template?.author : "",
      publicationDate: isEdit? dayjs(template?.publicationDate) : ""
    },
  });

  const onSubmit = async (data: Partial<Template>) => {
    try {
      const templateData: Partial<Template> = {
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
        let newTemplate = {} as Template;
        newTemplate = await postCreate(templateData);
        setTemplates([...templates, newTemplate]);

      } else {
        const selectedTemplate = template as Template;

        const result = await postUpdate(selectedTemplate.id, templateData);

        console.log("result", result);

        const editedTemplate: Template = {
          ...selectedTemplate,
          title: data.title!,
          content: data.content!,
          author: data.author!,
          publicationDate: new Date(data.publicationDate!).toDateString()
        };

        const filteredTemplates: Template[] = templates.filter(
          (item) => item.id !== selectedTemplate.id
        );

        console.log('editedTemplate',editedTemplate)
        const newTemplates = [...filteredTemplates, editedTemplate];

        newTemplates.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setTemplates(newTemplates);
      }

      const message = isEdit
        ? `${template?.title} editado!`
        : "Agregado";

      showNotification(message, "success");

      onClose();
    } catch (err) {
      console.log("Templates Modal", err);

      showNotificationError();
    }
  };

  return (
    <CustomModal
      name={isEdit ? "edit-template-modal" : "add-template-modal"}
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
