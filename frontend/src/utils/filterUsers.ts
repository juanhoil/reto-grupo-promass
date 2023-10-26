export const filterUsers = (users: User[]) => {
  return users
    .map((user) => {
      return {
        name: user.name,
        _id: user._id,
        type: user.type,
      };
    })
    .filter((user) => user.type === "employee");
};
