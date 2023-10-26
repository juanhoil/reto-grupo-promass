import { Control, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEditorProps {
  control: Control<any>;
  id: string;
  height?: string;
  width?: string;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  control,
  id,
  height = "430px",
  width = "auto",
}) => {
  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => {
        return (
          <ReactQuill
            style={{ height, width, marginBottom: "24px" }}
            {...field}
          />
        );
      }}
    />
  );
};
