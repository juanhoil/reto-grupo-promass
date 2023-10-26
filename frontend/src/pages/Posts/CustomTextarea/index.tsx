import { TextareaHTMLAttributes } from "react";
import { Control, Controller } from "react-hook-form";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  control: Control<any>;
  id: string;
  label: string;
  errors?: any;
  disabled?: boolean;
}

export const CustomTextarea: React.FC<TextareaProps> = ({
  control,
  id,
  label,
  errors,
  disabled = false,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <Controller
        name={id}
        control={control}
        render={({ field }) => {
          return (
            <div className="relative flex flex-col gap-y-2">
              <label
                htmlFor={id}
                className={`absolute transition-default left-2 -top-2 bg-white px-1 pl-2 ${
                  field.value ? "text-primary" : ""
                } ${disabled ? "text-t-secondary" : ""}`}
              >
                {label}
              </label>
              <textarea
                {...field}
                id={id}
                className="w-full h-[100px] p-5 pl-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
                disabled={disabled}
                {...rest}
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
