import { Add } from "@mui/icons-material";
import React from "react";

interface ChipProps {
  item: any;
  onClick: (item: any) => void;
}

export const Chip: React.FC<ChipProps> = ({ item, onClick }) => {
  return (
    <div
      className="flex items-center bg-primary/10 pl-2 pr-4 py-[2px] rounded-full cursor-pointer transition-default hover:bg-primary-light hover:text-white text-sm"
      onClick={() => onClick(item)}
    >
      <Add className="scale-50" /> {item.name}
    </div>
  );
};
