import { CustomDateTimePicker } from "@/components/CustomDateTimePicker";
import { CustomInput } from "@/components/CustomInput";
import { CustomModal } from "@/components/CustomModal";
import { CustomTextarea } from "@/pages/Campaigns/CampaignTemplates/CustomTextarea";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";

interface TemplatePreviewModal extends IModal {
  template: Template;
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModal> = ({
  open,
  onClose,
  template,
}) => {
  const { control } = useForm<Template>({
    mode: "onSubmit",
    defaultValues: {
      title: template.title,
      content: template.content,
      author: template.author,
      publicationDate: dayjs(template.publicationDate)
    },
  });

  return (
    <CustomModal
      name="template-modal"
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
