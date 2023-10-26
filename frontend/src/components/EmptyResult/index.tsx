import { EmptyResultIcon } from "../icons/EmptyResultIcon";

export const EmptyResult = ({
  text = "¡No se encontraron resultados!",
}: {
  text?: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <EmptyResultIcon />
      <h2 className="text-t-secondary">{text}</h2>
    </div>
  );
};
