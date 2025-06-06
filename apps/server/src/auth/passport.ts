import { OAuthProfile, ProviderEnum, ProviderTypes } from '@/types/oauth.types';
import prisma from '@/utils/prisma';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import type { VerifyCallback } from 'passport-oauth2';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL!;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL!;
// const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID!;
// const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET!;
// const FACEBOOK_CALLBACK_URL = process.env.FACEBOOK_CALLBACK_URL!;
// const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID!;
// const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET!;
// const LINKEDIN_CALLBACK_URL = process.env.LINKEDIN_CALLBACK_URL!;

const handleOAuthCallback =
  (provider: ProviderTypes) =>
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
    handleOAuthCallback(ProviderEnum.github)
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    handleOAuthCallback(ProviderEnum.google)
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_CLIENT_ID,
//       clientSecret: FACEBOOK_CLIENT_SECRET,
//       callbackURL: FACEBOOK_CALLBACK_URL,
//       profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
//     },
//     handleOAuthCallback(ProviderEnum.facebook)
//   )
// );

// passport.use(
//   new LinkedInStrategy(
//     {
//       clientID: LINKEDIN_CLIENT_ID,
//       clientSecret: LINKEDIN_CLIENT_SECRET,
//       callbackURL: LINKEDIN_CALLBACK_URL,
//       scope: ['r_emailaddress', 'r_liteprofile'],
//     },
//     handleOAuthCallback(ProviderEnum.linkedin)
//   )
// );
