import { DateTimePicker } from "@mui/x-date-pickers";
import { Control, Controller } from "react-hook-form";

interface DateTimePickerProps {
  control: Control<any>;
  id: string;
  label: string;
  errors?: any;
  disabled?: boolean;
}

export const CustomDateTimePicker: React.FC<DateTimePickerProps> = ({
  control,
  id,
  label,
  errors,
  disabled
}) => {
  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => {
        return (
          <div className="flex flex-col gap-y-1 w-full">
            <DateTimePicker
              viewRenderers={{
                hours: null,
                minutes: null,
                seconds: null,
              }}
              slotProps={{ textField: { variant: "standard" } }}
              sx={{ minWidth: "300px" }}
              label={label}
              {...field}
              disabled={disabled}
            />
            {errors && <div>{errors?.schedule}</div>}
          </div>
        );
      }}
    />
  );
};
