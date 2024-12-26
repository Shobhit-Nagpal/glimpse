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
  process.env.GOOGLE_CLIENT_ID || "your_google_client_id";
const GITHUB_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET || "your_google_client_secret";

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
    new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    }),
    async function(accessToken, refreshToken, profile, cb) {
      //Create or update user here
      const userEmail = profile.emails[0].value;
      const user = await userService.getUserByEmail(userEmail);

      if (!user) {
        const newUser = userService.createUser(
          userEmail,
          profile.displayName,
          Providers.GOOGLE as TProvider,
        );
        if (newUser) {
          cb(null, newUser);
        }
      } else {
        cb(null, user);
      }
    },
  );

  passport.use(
    new GitHubStrategy({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    }),
    function (accessToken, refreshToken, profile, cb) {
      //Create or update user here
    },
  );

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, {
        id: user.id,
        name: user.name,
      });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
}
