import prisma from '@/utils/prisma';
import { Provider } from '@prisma/client';
import passport from 'passport';
import {
  Strategy as GitHubStrategy,
  type Profile as GitHubProfile,
} from 'passport-github2';
import {
  Strategy as GoogleStrategy,
  type Profile as GoogleProfile,
} from 'passport-google-oauth20';
import type { VerifyCallback } from 'passport-oauth2';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL!;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL!;

type OAuthProfile = GitHubProfile | GoogleProfile;
const handleOAuthCallback =
  (provider: Provider) =>
  async (
    _accessToken: string,
    _refreshToken: string,
    profile: OAuthProfile,
    done: VerifyCallback
  ) => {
    try {
      const email = profile.emails?.[0]?.value;
      const name = profile.displayName || profile.username || '';
      const avatarUrl = profile.photos?.[0]?.value;

      if (!email) {
        return done(null, false, {
          message: `${provider} account has no public email`,
        });
      }

      let user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        user = await prisma.user.create({
          data: { email, name, provider, avatarUrl },
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  };

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
    },
    handleOAuthCallback('github')
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    handleOAuthCallback('google')
  )
);
