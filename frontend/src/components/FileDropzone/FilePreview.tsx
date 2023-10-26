import { Close, PictureAsPdf } from "@mui/icons-material";

export const FilePreview = ({
  file,
  allowCancel,
  onCancel,
}: {
  file: File;
  allowCancel: boolean;
  onCancel: () => void;
}) => {
  return (
    <div className="relative flex flex-col gap-y-2 py-4 px-8 rounded-md bg-neutral-100 w-full h-[55%]">
      <div className="text-t-primary font-medium text-sm">
        Archivo seleccionado:{" "}
      </div>
      <div className="flex items-center gap-x-2">
        <PictureAsPdf className="text-[#F40F02]" /> {file.name}
      </div>
      {allowCancel && (
        <div
          className="absolute top-1 right-2 bg-red-500 rounded-full flex items-center p-[1px] transition-default cursor-pointer hover:bg-red-600"
          onClick={onCancel}
        >
          <Close className="text-white scale-[0.65]" />
        </div>
      )}
    </div>
  );
};
