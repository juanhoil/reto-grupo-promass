import { CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <div className="flex flex-col justify-center text-center gap-y-12 h-[60vh]">
      <div className="text-xl font-semibold text-t-primary animate-pulse">
        Cargando...
      </div>
      <CircularProgress sx={{ width: "80%", alignSelf: "center" }} />
    </div>
  );
};
