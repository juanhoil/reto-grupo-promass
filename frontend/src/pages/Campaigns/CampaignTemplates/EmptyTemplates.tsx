import { EmptyResult } from "@/components/EmptyResult";
import { Button } from "@mui/material";

export const EmptyTemplates = ({
  onClick,
  canCreate,
}: {
  onClick: () => void;
  canCreate: boolean;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4 h-[75vh]">
      <EmptyResult />
      {canCreate && (
        <Button
          variant="outlined"
          sx={{ maxWidth: 250, alignSelf: "center" }}
          onClick={onClick}
        >
          Agregar nuevo
        </Button>
      )}
    </div>
  );
};
