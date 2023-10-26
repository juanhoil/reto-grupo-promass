import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import React from "react";

export interface CustomMenuItemProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}
export const CustomMenuItem: React.FC<CustomMenuItemProps> = ({
  label,
  onClick,
  icon,
}) => {
  return (
    <ListItem className="group h-6 w-full" sx={{ padding: "8px" }}>
      <ListItemButton
        className="flex items-center justify-between rounded-lg transition-default"
        onClick={onClick}
        sx={{
          padding: "0px 12px",
          color: (theme) => theme.palette.text.primary,
          ":hover": {
            background: (theme) => theme.palette.primary[300],
          },
        }}
      >
        {icon && <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>}
        <ListItemText
          primary={label}
          className="font-medium transition-default text-sm"
          disableTypography
        />
      </ListItemButton>
    </ListItem>
  );
};
