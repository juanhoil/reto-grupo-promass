import { Close } from "@mui/icons-material";

export const CloseIcon = ({ onClick }: { onClick: () => void }) => (
  <Close
    sx={{
      fontSize: "28px",
      position: "absolute",
      top: 20,
      right: 25,
      cursor: "pointer",
      transition: "ease-in-out 200ms all",
      ":hover": {
        color: "#64748b",
      },
    }}
    onClick={onClick}
  />
);
