import { InputHTMLAttributes, useState } from "react";
import ContentEditable from "react-contenteditable";
import { Control, Controller } from "react-hook-form";
import DOMPurify from "dompurify";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  id: string;
  label: string;
  errors?: any;
  disabled?: boolean;
}

export const CustomTextarea: React.FC<InputProps> = ({
  control,
  id,
  label,
  errors,
  disabled = false,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <Controller
        name={id}
        control={control}
        render={({ field }) => {
          const handleChange = (e: any) => {
            const sanitizedHTML = DOMPurify.sanitize(e.target.value);
            field.onChange(sanitizedHTML);
          };

          return (
            <div className="relative flex flex-col gap-y-2">
              <div
                className={`absolute transition-default left-1 -top-1 bg-white px-1 pl-2 ${
                  focused ? "text-primary" : ""
                } ${disabled ? "text-t-secondary" : ""}`}
              >
                {label}
              </div>
              <ContentEditable
                html={field.value}
                onChange={handleChange} // Utiliza handleChange para sanitizar el HTML
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                disabled={disabled}
                style={{
                  borderRadius: "4px",
                  border: `1px solid #c4c4c4`,
                  margin: "8px 0",
                  padding: "16px 20px",
                  height: "80px",
                  overflowY: "auto",
                  color: disabled ? "#c4c4c4" : "#636363",
                }}
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
