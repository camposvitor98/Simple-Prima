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
    const { searchString, skip, take, orderBy } = req.query;

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
