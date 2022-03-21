import { Request, Response } from "express";
import { PostsServices } from "./services";

const postsServices = new PostsServices();

class PostsControllers {
  createPost = async (req: Request, res: Response): Promise<Response> => {
    const { title, content, authorEmail } = req.body;

    try {
      const result = await postsServices.createPost({
        title,
        content,
        authorEmail,
      });
      return res.json(result);
    } catch (err: any) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

  updatePostsViews = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const post = await postsServices.updateViews({
        id,
      });

      return res.json(post);
    } catch (err) {
      return res.status(500).json({
        error: `Post with ID ${id} does not exist in the database`,
      });
    }
  };

  getFeed = async (req: Request, res: Response): Promise<Response> => {
    const {
      searchString = "",
      skip,
      take,
      orderBy = "asc",
      ...rest
    } = req.query;

    // Conferindo se veio algum param não esperado
    if (Object.entries(rest).length) {
      console.log(rest);
      const newRest = Object.entries(rest).reduce(
        (current: { key: string; value: unknown }[], value) => [
          ...current,
          { key: value[0], value: value[1] },
        ],
        []
      );

      if (newRest.length > 1) {
        return res.status(400).json({
          error: `Your params (${newRest
            .map((param) => param.key)
            .join(", ")}) are not allowed`,
        });
      }
      return res.status(400).json({
        error: `Your param (${newRest[0].key}) are not allowed`,
      });
    }

    // Colocando um param como required
    if (!take) {
      return res.status(400).json({
        error:
          "Take param is required, please select the amount of posts you want to see!",
      });
    }

    try {
      const feed = await postsServices.getPublishedFilteredPosts({
        searchString: String(searchString),
        skip: String(skip),
        take: String(take),
        orderBy: String(orderBy),
      });
      return res.json(feed);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  getPost = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id?: string } = req.params;

    try {
      const post = await postsServices.getPostById({ id });

      return res.json(post);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  getPosts = async (req: Request, res: Response): Promise<Response> => {
    const { id }: { id?: string } = req.params;

    try {
      const post = await postsServices.getAllPosts();

      return res.json(post);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  deletePost = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const postToDelete = await postsServices.deletePostById({ id });

      return res.json(postToDelete);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  publishPost = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const postToPublish = await postsServices.updatePublished({ id });

      return res.json(postToPublish);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };
}

export { PostsControllers };
