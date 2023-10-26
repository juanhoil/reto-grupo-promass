export const getPagePermissions = (role: Role, pageName: string) => {
  const isAdmin = role?.name?.toLowerCase() === "admin";

  if (role && !isAdmin) {
    const { permissions } = role;

    const actualPermission = permissions?.find(
      (permission) => permission.name === pageName
    );

    return {
      canCreate: !!actualPermission?.action.includes("write"),
      canEdit: !!actualPermission?.action.includes("update"),
      canDelete: !!actualPermission?.action.includes("delete"),
    };
  }

  return {
    canCreate: isAdmin,
    canEdit: isAdmin,
    canDelete: isAdmin,
  };
};
