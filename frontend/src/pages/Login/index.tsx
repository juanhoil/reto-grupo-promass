import { CustomInput } from "@/components/CustomInput";
import { loginService } from "@/services/auth.service";
import { showNotificationError } from "@/utils/showNotification";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { schema } from "./validation";
import { login } from "@/store/useLoginStore";

export const Login = () => {
  // hooks
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // functions
  const onSubmit = async (data: any) => {
    try {
      const user = await loginService({
        email: data.email,
        password: data.password,
      });

      login(user.id, user.token);

      navigate("/");
    } catch (err) {
      console.log("Login", err);

      showNotificationError();
    }
  };

  return (
    <div className="flex flex-col items-center lg:gap-x-4 h-full">
      <div className="flex justify-center items-center h-24 w-full py-4 lg:px-4 border-0 border-b-[1px] border-solid border-neutral-200 ">
        {/*<img src={logo} alt="BotAngel logo" className="w-40 self-center" />*/}
      </div>
      <div className="flex-1 flex flex-col gap-y-8 items-center justify-between lg:h-[85%] p-8 w-[80%]">
        <h1 className="text-t-primary">Iniciar Sesión</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-12 w-full"
        >
          <CustomInput
            id="email"
            control={control}
            label="Correo"
            errors={errors.email}
            labelBackground="white"
          />
          <CustomInput
            id="password"
            control={control}
            label="Contraseña"
            errors={errors.password}
            labelBackground="white"
            password
          />

          <div className="flex flex-col items-center gap-y-3 w-full">
            <Button type="submit" disabled={isSubmitting || !isDirty}>
              Iniciar Sesión
            </Button>
            <div
              className="text-t-primary text-xs cursor-pointer hover:underline hover:text-primary transition-default"
              onClick={() => navigate("/reset-password")}
            >
              ¿Olvidaste la contraseña?
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
