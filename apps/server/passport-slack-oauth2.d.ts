declare module 'passport-slack-oauth2' {
  import { Strategy as OAuth2Strategy, VerifyCallback } from 'passport-oauth2';

  interface SlackProfile extends Record<string, unknown> {
    id: string;
    displayName: string;
    username?: string;
    name?: string | { familyName?: string; givenName?: string };
    emails?: { value: string }[];
    photos?: { value: string }[];
    user?: {
      email?: string;
      image_192?: string;
    };
  }

  interface SlackStrategyOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope?: string[];
    skipUserProfile?: boolean;
  }

  class SlackStrategy extends OAuth2Strategy {
    constructor(
      options: SlackStrategyOptions,
      verify: (
        accessToken: string,
        refreshToken: string,
        profile: SlackProfile,
        done: VerifyCallback
      ) => void
    );
  }

  export = SlackStrategy;
}
