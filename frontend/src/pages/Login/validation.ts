import * as yup from "yup";

export const schema = yup.object({
  email: yup
    .string()
    .email("Debes ingresar un e-mail válido")
    .matches(/^(?!.*@[^,]*,)/, "Debes ingresar un e-mail válido")
    .required("El campo es requerido"),
  password: yup
    .string()
    .min(8, "Debe tener un mínimo de 8 caracteres")
    .required("El campo es requerido"),
});
