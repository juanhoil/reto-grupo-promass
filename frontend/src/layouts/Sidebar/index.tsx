import { logout } from "@/store/useLoginStore";
import { useUsersStore } from "@/store/useUsersStore";
import { Drawer, List, Theme, useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.png";
import { SidebarItem } from "./SidebarItem";
import { items } from "./items";

export interface SidebarProps {
  isOpen?: boolean;
  onSidebarClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onSidebarClose }) => {
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  // hooks
  const { currentUser } = useUsersStore();

  // router
  const navigate = useNavigate();
  const handleClick = (route: string) => navigate(route);

  const sidebarItems = useMemo(() => {
    {
      return items;
    }
  }, [currentUser]);

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onSidebarClose}
      variant={isMd ? "permanent" : "temporary"}
      PaperProps={{
        sx: {
          width: 300,
          background: (theme) => theme.palette.sidebar.main,
          paddingTop: 2,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        },
      }}
    >
      <img
        src={logo}
        alt="BotAngel logo"
        className="h-16 w-3/4 mb-8 self-center"
      />
      <List className="py-12 px-6 flex-1">
        {sidebarItems?.map((item, index) => (
          <SidebarItem
            key={`${item?.label}_${index}`}
            item={item!}
            disabled={false}
            onClick={(route) => handleClick(route)}
          />
        ))}
      </List>
      <div
        className="flex flex-col items-center my-4 py-4 w-full font-semibold text-neutral-400 cursor-pointer hover:bg-sidebar-light hover:text-primary transition-default"
        onClick={logout}
      >
        Cerrar Sesión
      </div>
    </Drawer>
  );
};

export default Sidebar;
