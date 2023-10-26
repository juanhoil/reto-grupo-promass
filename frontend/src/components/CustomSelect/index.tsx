import { MenuItem, TextField } from "@mui/material";
import { SelectHTMLAttributes } from "react";
import { Control, Controller, useController } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface SelectProps extends SelectHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  id: string;
  label: string;
  options: string[];
  placeholder?: string;
  labelBackground?: "white" | "background";
  errors?: any;
}

export const CustomSelect: React.FC<SelectProps> = ({
  control,
  id,
  label,
  options,
  errors,
  placeholder = "",
  labelBackground = "background",
  ...rest
}) => {
  const borderColorClass = errors ? "#ef4444" : "#92C8D8";

  const { fieldState } = useController({ control, name: id });

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <TextField
            select
            id={id}
            label={label}
            placeholder={placeholder}
            sx={{
              "& fieldset.MuiOutlinedInput-notchedOutline": {
                borderColor: borderColorClass,
              },
            }}
            InputLabelProps={{
              shrink: true,
              sx: {
                "&.MuiInputLabel-root": {
                  fontSize: 16,
                },
                "&.MuiInputLabel-outlined.MuiInputLabel-shrink": {
                  transform: "translate(0, -12px)",
                  fontSize: 16,
                  margin: "0 14px",
                  backgroundColor:
                    labelBackground === "background"
                      ? (theme) => theme.palette.backgroundColor.main
                      : "white",
                  minWidth: 60,
                },
              },
            }}
            {...(rest as any)}
            {...field}
            defaultValue=""
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <div className="text-xs 2xl:text-sm text-red-400">
        {errors?.message ?? fieldState.error?.message}
      </div>
    </div>
  );
};
