import { CustomInput } from "@/components/CustomInput";
import { forgotPassword } from "@/services/auth.service";
import { showNotificationError } from "@/utils/showNotification";
import { yupResolver } from "@hookform/resolvers/yup";
import { Key, NavigateBefore } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { schema } from "./validation";

export const ResetPassword = () => {
  // hooks
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<{ email: string }>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  // functions
  const onSubmit = async (data: { email: string }) => {
    try {
      console.log(data);

      const result = await forgotPassword({ email: data.email });

      console.log("result", result);
    } catch (err) {
      console.log("Reset Password", err);

      showNotificationError();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-16">
      <div
        className="absolute top-5 left-5 flex items-center text-t-secondary text-xs uppercase cursor-pointer hover:underline hover:text-primary transition-default"
        onClick={() => navigate("/login")}
      >
        <NavigateBefore />
        VOLVER
      </div>
      <div className="flex items-center justify-center bg-primary-light h-20 w-20 rounded-full">
        <Key className="text-white scale-[1.5]" />
      </div>
      <form
        className="flex flex-col items-center justify-center gap-y-12 px-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <h1>Restablecer Contraseña</h1>
          <div className="max-w-xs text-center text-t-secondary">
            Ingresa tu correo electrónico registrado abajo para restablecer tu
            contraseña
          </div>
        </div>
        <CustomInput
          control={control}
          id="email"
          label="Correo"
          errors={errors.email}
          labelBackground="white"
        />

        <Button type="submit" disabled={isSubmitting || !isDirty}>
          Enviar
        </Button>
      </form>
    </div>
  );
};
