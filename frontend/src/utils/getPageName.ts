export const getPageName = (route: string) => {
  switch (route) {
    case "/brains":
      return "Cerebros";

    case "/users":
      return "Usuarios";

    case "/clients":
      return "Clientes";

    case "/campaigns/diffusion":
      return "Difusiones";

    case "/campaigns/templates":
      return "Plantillas";

    case "/settings/profile":
      return "Perfil";

    case "/settings/roles":
      return "Roles";

    default:
      return "";
  }
};
