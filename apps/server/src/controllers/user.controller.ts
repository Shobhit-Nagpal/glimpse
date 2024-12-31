import { Request, Response } from "express";

const signUp = async (req: Request, res: Response) => {
  res.send("Sign up");
};

const signIn = async (req: Request, res: Response) => {
  res.send("Sign in");
};

export { signUp, signIn };
