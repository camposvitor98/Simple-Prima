import { Request, Response } from "express";
import { UsersServices } from "./services";

const userServices = new UsersServices();
class UsersControllers {
  userSignup = async (req: Request, res: Response): Promise<Response> => {
    const { name, email } = req.body;

    if (!email) {
      return res.status(500).json({
        message: "The filed email is required",
      });
    }

    try {
      const result = await userServices.createUser({ name, email });
      return res.json(result);
    } catch (err: any) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

  getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await userServices.getAllUsers();
      res.json(users);

      return res.json(users);
    } catch (err: any) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

  getDrafts = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const drafts = await userServices.getUsersWithoutPostPublished({ id });

      return res.json(drafts);
    } catch (err: any) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };
}

export { UsersControllers };
