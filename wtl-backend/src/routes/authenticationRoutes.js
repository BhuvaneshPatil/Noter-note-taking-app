import { Router } from "express";
import { signIn, signUp } from "../controllers";

const authenticationRouter = Router();

authenticationRouter.post("/sign-up", signUp);
authenticationRouter.post("/sign-in", signIn);

export default authenticationRouter;
