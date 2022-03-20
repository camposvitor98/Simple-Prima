import { Router } from "express";
import { UsersControllers } from "../modules/Users/controllers";
import { PostsControllers } from "../modules/Posts/controllers";
const routes = Router();

const usersControllers = new UsersControllers();
const postsControllers = new PostsControllers();

routes.post(`/signup`, usersControllers.userSignup);

routes.post(`/post`, postsControllers.createPost);
routes.get(`/posts`, postsControllers.getPosts);

routes.put("/post/:id/views", postsControllers.updatePostsViews);

routes.put("/publish/:id", postsControllers.publishPost);

routes.delete(`/post/:id`, postsControllers.deletePost);

routes.get("/users", usersControllers.getUsers);

routes.get("/user/:id/drafts", usersControllers.getDrafts);

routes.get(`/post/:id`, postsControllers.getPost);

routes.get("/feed", postsControllers.getFeed);

export { routes };
