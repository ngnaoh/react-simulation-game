export const getPermission = (permissions: string) => {
  return permissions.split(",");
};

export const hasPermission = (permissions: string, permission: string) => {
  return permissions.includes(permission);
};
