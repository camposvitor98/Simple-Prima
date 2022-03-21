import { Prisma } from "@prisma/client";
import { prisma } from "../../infra/server";

type CreatePostProps = {
  title: string;
  content: string;
  authorEmail: string;
};

type UpdateViewsProps = {
  id: string;
};
type DeletePostProps = {
  id: string;
};
type GetPostByIdProps = {
  id: string;
};
type UpdatePublishedProps = {
  id: string;
};
type GetPublishedPosts = {
  searchString: string;
  skip: string;
  take: string;
  orderBy: string;
};

class PostsServices {
  createPost = async (props: CreatePostProps) => {
    const { title, content, authorEmail } = props;

    const isInvalidEmail = !prisma.user.findUnique({
      where: { email: authorEmail },
    });

    if (isInvalidEmail) {
      throw new Error("Email doesn't exist on database");
    }

    return await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { email: authorEmail } },
      },
    });
  };

  deletePostById = async (props: DeletePostProps) => {
    const { id } = props;

    return await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
  };

  getPostById = async (props: GetPostByIdProps) => {
    const { id } = props;

    return await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });
  };
  getAllPosts = async () => {
    return await prisma.post.findMany();
  };

  updateViews = async (props: UpdateViewsProps) => {
    const { id } = props;

    return await prisma.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
  };

  updatePublished = async (props: UpdatePublishedProps) => {
    const { id } = props;

    const postData = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: {
        published: true,
      },
    });

    return await prisma.post.update({
      where: { id: Number(id) || undefined },
      data: { published: !postData?.published },
    });
  };

  getPublishedFilteredPosts = async (props: GetPublishedPosts) => {
    const { searchString, skip, take, orderBy } = props;

    const or: Prisma.PostWhereInput = searchString
      ? {
          OR: [
            { title: { contains: searchString as string } },
            { content: { contains: searchString as string } },
          ],
        }
      : {};
    return await prisma.post.findMany({
      where: {
        published: true,
        ...or,
      },
      include: { author: true },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        updatedAt: orderBy as Prisma.SortOrder,
      },
    });
  };
}

export { PostsServices };
