import { Checkbox, InputLabel } from "@mui/material";
import { InputHTMLAttributes, PropsWithChildren } from "react";
import { Control, Controller } from "react-hook-form";

// Components
interface CustomCheckboxProps
  extends PropsWithChildren,
    InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  id: string;
  label?: string;
  disabled?: boolean;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  control,
  id,
  label = "",
  disabled = false,
  children,
  ...rest
}) => {
  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <InputLabel
          sx={{
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <Checkbox
            id={id}
            checked={!!field.value}
            sx={{
              padding: "0px",
            }}
            {...field}
            {...(rest as any)}
            disabled={disabled}
          />
          <div>{label}</div>
          {children}
        </InputLabel>
      )}
    />
  );
};
