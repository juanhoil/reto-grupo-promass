import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface CustomListItemProps extends SidebarItemProps {
  active: boolean;
}

export const CustomListItem: React.FC<CustomListItemProps> = ({
  item,
  onClick,
  active,
  disabled = false,
}) => {
  return (
    <ListItemButton
      sx={{
        color: active ? "white" : (theme) => theme.palette.text.primary,
        ":hover": {
          bgcolor: (theme) => theme.palette.primary.light,
          color: "white",
          transition: "all ease 300ms",
        },
        background: active ? (theme) => theme.palette.primary.light : "",
      }}
      onClick={() => onClick(item.route!)}
      disabled={disabled}
      className="group"
    >
      <ListItemIcon
        sx={{
          color: active ? "white" : (theme) => theme.palette.text.primary,
        }}
        className={`group-hover:text-white ${active ? "text-white" : ""}`}
      >
        {item.icon}
      </ListItemIcon>
      <ListItemText primary={item.label} disableTypography />
    </ListItemButton>
  );
};
