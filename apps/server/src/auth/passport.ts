import prisma from '@/utils/prisma';
import passport from 'passport';
import { Strategy as GitHubStrategy, type Profile } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import type { VerifyCallback } from 'passport-oauth2';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL!;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName || profile.username || '';

        if (!email)
          return done(null, false, {
            message: 'GitHub account has no public email',
          });

        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          user = await prisma.user.create({
            data: { email, name, provider: 'github' },
          });
        }

        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/auth/google/callback',
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const user = { id: profile.id, provider: 'google' };
      return done(null, user);
    }
  )
);
