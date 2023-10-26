import { Close, CloudUpload } from "@mui/icons-material";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { ImagePreview } from "./ImagePreview";
import { Button, CircularProgress } from "@mui/material";

interface ImageDropzoneProps {
  onSelected: (image: File) => void;

  onCancel?: () => void;
  loading?: boolean;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onSelected,
  onCancel = () => {},
  loading = false,
}) => {
  const [, setSelectedFile] = useState<File>({} as File);
  const [imageUrl, setImageUrl] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);

    setSelectedFile(file);
    setImageUrl(url);
    onSelected(file);
  };

  return (
    <div
      className="relative flex-1 flex items-center justify-center bg-gray-200/20 border-gray-300 border-dashed border-2 px-2 py-1 overflow-hidden w-full max-w-[320px] lg:max-w-[95%] "
      style={{ minHeight: "115px" }}
    >
      <div
        className="absolute top-1 right-2 bg-red-600 rounded-full flex items-center p-[1px] default-transition cursor-pointer hover:bg-red-500"
        onClick={onCancel}
      >
        <Close className="text-white text-lg scale-75" />
      </div>
      {loading ? (
        <div className="flex flex-col items-center gap-y-4">
          <CircularProgress size={35} />
          <div className="text-t-secondary font-medium text-sm">
            Cargando...
          </div>
        </div>
      ) : (
        <>
          {imageUrl ? (
            <ImagePreview
              imageUrl={imageUrl}
              onCancel={() => setImageUrl("")}
            />
          ) : (
            <Dropzone
              onDrop={onDrop}
              accept={{
                "image/jpeg": [],
                "image/png": [],
              }}
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="flex flex-col items-center gap-y-2">
                  <div className="flex flex-col items-center">
                    <CloudUpload className="text-gray-500 scale-75" />
                    <div className="text-gray-500 text-sm">
                      Arrasta una foto aquí
                    </div>
                  </div>
                  <div
                    {...getRootProps()}
                    className="flex flex-col items-center gap-y-4"
                  >
                    <input {...getInputProps()} />
                    <Button className="py-1" style={{ fontSize: "12px" }}>
                      Buscar
                    </Button>
                  </div>
                </div>
              )}
            </Dropzone>
          )}
        </>
      )}
    </div>
  );
};
