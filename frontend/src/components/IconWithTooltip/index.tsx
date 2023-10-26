import { Tooltip } from "@mui/material";
import React from "react";

interface IconWithTooltipProps {
  icon: React.ReactElement;
  tooltip: string;
  onClick?: () => void;
}

export const IconWithTooltip: React.FC<IconWithTooltipProps> = ({
  icon,
  tooltip,
  onClick = () => {},
}) => {
  return (
    <Tooltip title={tooltip} onClick={onClick}>
      {icon}
    </Tooltip>
  );
};
