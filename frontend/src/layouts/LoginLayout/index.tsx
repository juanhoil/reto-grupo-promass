import { Card } from "@mui/material";
import { Outlet } from "react-router-dom";

export const LoginLayout = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(7,89,133,1) 0%, rgba(2,132,199,1) 66%, rgba(6,182,212,1) 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
      className="w-screen h-full"
    >
      <Card className="rounded-md w-[90%] lg:w-1/2 min-h-[450px] overflow-hidden">
        <Outlet />
      </Card>
    </div>
  );
};
