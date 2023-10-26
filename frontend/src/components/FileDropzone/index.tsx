import { CloudUpload } from "@mui/icons-material";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Button, CircularProgress } from "@mui/material";
import { FilePreview } from "./FilePreview";

interface FileDropzoneProps {
  allowCancel: boolean;
  loading?: boolean;
  onSelected: (File: File) => void;
  //onCancel?: () => void;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  allowCancel,
  loading = false,
  onSelected,
  //onCancel = () => {},
}) => {
  const [selectedFile, setSelectedFile] = useState<File>({} as File);
  const [fileUrl, setFileUrl] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);

    setSelectedFile(file);
    setFileUrl(url);
    onSelected(file);
  };

  const resetDropzone = () => {
    setSelectedFile({} as File);
    setFileUrl("");
    onSelected({} as File);
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-100/20 border-gray-300 border-dashed border-2 py-2 px-5 h-44 lg:h-32 overflow-hidden min-w-full ">
      {loading ? (
        <div className="flex flex-col items-center gap-y-4">
          <CircularProgress size={35} />
          <div className="text-t-secondary font-medium text-sm">
            Cargando...
          </div>
        </div>
      ) : (
        <>
          {fileUrl ? (
            <FilePreview
              file={selectedFile}
              onCancel={resetDropzone}
              allowCancel={allowCancel}
            />
          ) : (
            <Dropzone
              onDrop={onDrop}
              accept={{
                "application/pdf": [],
              }}
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="flex flex-col items-center gap-y-4">
                  <div className="flex flex-col items-center">
                    <CloudUpload className="text-gray-500 text-4xl" />
                    <div className="text-gray-500">Arrasta un archivo aquí</div>
                  </div>
                  <div
                    {...getRootProps()}
                    className="flex flex-col items-center gap-y-4"
                  >
                    <input {...getInputProps()} />
                    <Button className="py-1">Buscar</Button>
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
