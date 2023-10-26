import { useLoginStore } from "@/store/useLoginStore";
import { setCurrentUser, setUsers, useUsersStore } from "@/store/useUsersStore";
import { getPageName } from "@/utils/getPageName";
import { getUsersByQuery } from "@/utils/getUsersByQuery";
import { Menu } from "@mui/icons-material";
import { Theme, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

export const Layout = () => {
  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.up("xs"));

  // hooks
  const { userId, token } = useLoginStore();
  const { currentUser } = useUsersStore();

  // states
  const [openSidebar, setOpenSidebar] = useState(!isSm);

  // routes
  const location = useLocation();
  const { pathname } = location;

  const getUsers = useCallback(async () => {
    try {
      const users: User[] = await getUsersByQuery();

      const actualUser = users.find((user: User) => user?.id === userId);

      if (actualUser) {
        setCurrentUser(actualUser);
      }

      setUsers(users);
    } catch (err) {
      console.log("Layout - Get Users", err);
    }
  }, [userId]);

  useEffect(() => {
    if (token && !currentUser?.id) {
      //getUsers();
    }
  }, [getUsers, currentUser, token]);

  return (
    <div className="flex relative">
      {isSm && (
        <Menu
          className="w-6 h-6 px-4 py-2 absolute text-sidebar-dark"
          onClick={() => setOpenSidebar(true)}
        />
      )}
      <Sidebar
        isOpen={openSidebar}
        onSidebarClose={() => setOpenSidebar(false)}
      />
      <div className="flex-1 flex flex-col items-center gap-y-8 lg:gap-y-12 w-full md:ml-[300px] min-h-[85vh] px-4 lg:px-8 py-12 overflow-x-hidden">
        {getPageName(pathname) && (
          <h1 style={{ marginBlock: 0 }}>{getPageName(pathname)}</h1>
        )}
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
