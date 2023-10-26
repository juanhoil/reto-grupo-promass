import { TextField } from "@mui/material";
import { InputHTMLAttributes, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { EndAdornment } from "./EndAdornment";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  id: string;
  label: string;
  labelBackground?: "white" | "background";
  disabled?: boolean;
  password?: boolean;
  search?: boolean;
  onSearch?: () => void;
  multiline?: boolean;
  rows?: number;
  errors?: any;
}

export const CustomInput: React.FC<InputProps> = ({
  control,
  id,
  label,
  errors,
  labelBackground = "background",
  disabled = false,
  password = false,
  search = false,
  multiline = false,
  rows = 3,
  onSearch = () => {},
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-col gap-y-2 w-full ">
      <Controller
        name={id}
        control={control}
        render={({ field }) => {
          return (
            <div className="flex flex-col gap-y-2">
              <TextField
                type={password && !isVisible ? "password" : "text"}
                id={id}
                label={label}
                variant="outlined"
                multiline={multiline}
                rows={multiline ? rows : 1}
                sx={{
                  borderRadius: "10px",
                  "& .MuiFilledInput-root": {
                    background: "#fafafa",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <EndAdornment
                      search={search}
                      onSearch={onSearch}
                      password={password}
                      isVisible={isVisible}
                      onChangeVisibility={(value) => setIsVisible(value)}
                    />
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    "&.MuiFormLabel-asterisk": {
                      color: "red",
                    },
                    "&.MuiInputLabel-outlined.MuiInputLabel-shrink": {
                      transform: "translate(0, -12px)",
                      fontSize: 16,
                      margin: "0 14px",
                      backgroundColor:
                        labelBackground === "background"
                          ? (theme) => theme.palette.backgroundColor.main
                          : "white",
                      minWidth: 55,
                    },
                  },
                }}
                {...(rest as any)}
                {...field}
                disabled={disabled}
              />
            </div>
          );
        }}
      />
      {errors && (
        <div className="text-xs 2xl:text-sm text-red-400">
          {errors?.message}
        </div>
      )}
    </div>
  );
};
