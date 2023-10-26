import { Modal } from "@mui/material";
import { PropsWithChildren } from "react";
import { CloseIcon } from "../icons/CloseIcon";

interface CustomModalProps extends PropsWithChildren {
  name: string;
  open: boolean;
  onClose: () => void;
  title?: string;
  disableClose?: boolean;
  customCss?: string;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  name,
  open,
  onClose,
  children,
  title = "",
  disableClose = false,
  customCss = "",
}) => {
  return (
    <Modal
      aria-label={name}
      open={open}
      onClose={onClose}
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        verticalAlign: "middle",
      }}
    >
      <div
        className={`flex flex-col items-center gap-y-8 lg:gap-y-12 bg-white p-8 2xl:p-16 rounded-md z-[1500] shadow-lg absolute top-0 md:top-[15%] md:left-1/3 w-[87%] md:max-w-[40%] min-h-full md:min-h-min ${customCss}`}
      >
        {!disableClose && <CloseIcon onClick={onClose} />}
        {title && (
          <div className="text-lg lg:text-2xl font-bold text-content-primary">
            {title}
          </div>
        )}
        {children}
      </div>
    </Modal>
  );
};
