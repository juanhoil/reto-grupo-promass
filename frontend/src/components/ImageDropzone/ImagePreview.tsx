import { Close } from "@mui/icons-material";

interface ImagePreviewProps {
  imageUrl: string;
  onCancel: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  onCancel,
}) => {
  return (
    <div className="flex items-center justify-between gap-x-4 lg:gap-x-12 h-28">
      <div
        className="absolute top-1 right-2 bg-red-600 rounded-full flex items-center p-[1px] default-transition cursor-pointer hover:bg-red-500"
        onClick={onCancel}
      >
        <Close className="text-white text-lg scale-75" />
      </div>

      <img src={imageUrl} className="w-24 h-24 object-contain" />
    </div>
  );
};
