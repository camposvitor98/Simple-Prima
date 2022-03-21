import { prisma } from "../../infra/server";

type CreateUsersProps = {
  name: string;
  email: string;
};

type GetDraftsProps = {
  id: string;
};

class UsersServices {
  async createUser(props: CreateUsersProps) {
    const { name, email } = props;

    const emailAlreadyExists = await prisma.user.findFirst({
      where: { email: email },
    });

    if (emailAlreadyExists) {
      throw new Error("Email already exists");
    }

    return await prisma?.user.create({
      data: {
        name,
        email,
      },
    });
  }

  async getAllUsers() {
    return await prisma?.user.findMany();
  }

  async getUsersWithoutPostPublished(props: GetDraftsProps) {
    const { id } = props;

    return await prisma?.user
      .findUnique({
        where: {
          id: id,
        },
      })
      .posts({
        where: { published: false },
      });
  }
}

export { UsersServices };
