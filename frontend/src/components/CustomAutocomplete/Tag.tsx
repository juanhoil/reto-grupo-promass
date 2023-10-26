import { Chip, Tooltip } from "@mui/material";

interface TagProps {
  label: string;
  onDelete: (n: number) => void;
  tooltip?: string;
}

export const Tag: React.FC<TagProps> = ({ label, onDelete, tooltip }) => {
  return (
    <Tooltip title={tooltip} disableHoverListener={!tooltip}>
      <Chip
        label={label}
        onDelete={onDelete}
        sx={{
          backgroundColor: (theme) => theme.palette.primary.light,
          color: "white",
          "& .MuiChip-deleteIcon": {
            color: (theme) => theme.palette.backgroundColor.main,
            transition: "all ease 500ms",
            ":hover": {
              color: "#d4d4d4",
            },
          },
        }}
      />
    </Tooltip>
  );
};
