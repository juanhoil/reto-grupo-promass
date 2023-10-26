import * as yup from "yup";

export const schema = yup.object({
  email: yup
    .string()
    .email("Debes ingresar un e-mail válido")
    .matches(/^(?!.*@[^,]*,)/, "Debes ingresar un e-mail válido")
    .required("El campo es requerido"),
});
