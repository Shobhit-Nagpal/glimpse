const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
import passport from "passport";
import dotenv from "dotenv";
import { UserRepository } from "../../repositories/user.repository";
import { UserService } from "../../services/user.service";
import { Providers } from "../../consts";
import { TProvider } from "../../types";

dotenv.config();

const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID || "your_google_client_id";
const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET || "your_google_client_secret";

const GITHUB_CLIENT_ID =
  process.env.GITHUB_CLIENT_ID || "your_google_client_id";
const GITHUB_CLIENT_SECRET =
  process.env.GITHUB_CLIENT_SECRET || "your_google_client_secret";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export function initPassport() {
  if (
    !GOOGLE_CLIENT_ID ||
    !GOOGLE_CLIENT_SECRET ||
    !GITHUB_CLIENT_ID ||
    !GITHUB_CLIENT_SECRET
  ) {
    throw new Error(
      "Missing environment variables for authentication providers",
    );
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3002/api/auth/google/callback",
      },
      async function (
        _accessToken: string,
        _refreshToken: string,
        profile: any,
        done: (error: any, user?: any) => void,
      ) {
        //Create or update user here
        try {
          const userEmail = profile.emails[0].value;
          const user = await userService.getUserByEmail(userEmail);

          if (!user) {
            const newUser = await userService.createUser(
              userEmail,
              profile.displayName,
              Providers.GOOGLE as TProvider,
            );

            if (newUser) {
              return done(null, newUser);
            } else {
              return done(new Error("Error creating user"));
            }
          } else {
            return done(null, user);
          }
        } catch (err) {
          return done(err);
        }
      },
    ),
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "/api/auth/github/callback",
      },
      async function (
        _acessToken: string,
        _refreshToken: string,
        profile: any,
        done: (error: any, user?: any) => void,
      ) {
        console.log("BOSS MANNNNNNNN");
        return done(null, { id: "nnn" });
      },
    ),
  );

  passport.serializeUser(function (user: any, cb) {
    process.nextTick(function () {
      return cb(null, {
        id: user.id,
        name: user.name,
      });
    });
  });

  passport.deserializeUser(function (user: any, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
}
