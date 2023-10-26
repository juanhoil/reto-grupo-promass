import { InputHTMLAttributes } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Control, Controller, useController } from "react-hook-form";
import { Tag } from "./Tag";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface CustomAutocompleteProps
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  id: string;
  label: string;
  options: string[];
  minHeight?: string;
  disabled?: boolean;
  freeSolo?: boolean;
  tooltips?: string[];
  placeholder?: string;
  errors?: any;
}

export const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  control,
  id,
  label,
  options,
  minHeight = "150px",
  disabled = false,
  placeholder = "",
  tooltips = [],
  errors,
}) => {
  const { fieldState } = useController({ control, name: id });

  return (
    <div className="flex flex-col gap-y-1 w-full">
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <Autocomplete
            multiple
            filterSelectedOptions
            id="tags-outlined"
            options={options}
            disabled={disabled}
            sx={{
              "& .MuiInputBase-root": {
                paddingBottom: "12px",
                gap: "4px",
                paddingTop: 2,
                minHeight,
              },
            }}
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option, index) => (
                <Tag
                  key={index}
                  label={option}
                  onDelete={() => getTagProps({ index }).onDelete(index)}
                  tooltip={tooltips.length > 0 ? tooltips[index + 1] : ""}
                />
              ));
            }}
            renderInput={(params: any) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    "&.MuiInputLabel-root": {
                      fontSize: 18,
                      fontWeight: 500,
                    },
                  },
                }}
              />
            )}
            onChange={(_, data) => field.onChange(data)}
            value={field.value}
          />
        )}
      />
      <div className="text-xs 2xl:text-sm text-red-400">
        {errors?.message ?? fieldState.error?.message}
      </div>
    </div>
  );
};
