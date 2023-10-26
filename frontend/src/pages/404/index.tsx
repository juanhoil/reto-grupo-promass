import { Button } from "@mui/material";
import shapes from "../../assets/images/shapes.svg";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  // router
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${shapes})`,
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center gap-y-4 w-full bg-white/20 h-full">
        <h1 className="text-8xl leading-none h-6">404</h1>
        <h2 className="text-t-secondary">¡Página no encontrada!</h2>
        <Button variant="contained" onClick={() => navigate("/post")}>
          Volver al sitio
        </Button>
      </div>
    </div>
  );
};
