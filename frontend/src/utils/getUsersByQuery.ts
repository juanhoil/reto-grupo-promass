import { usersGetByQuery } from "@/services/users.service";

export const getUsersByQuery = async (): Promise<User[]> => {
  const users = await usersGetByQuery(
    JSON.stringify({
      select: [],
      sort: { createdAt: -1 },
      limit: 100,
      page: 1,
      populate: [{ path: "role" }],
    })
  );

  return users;
};
