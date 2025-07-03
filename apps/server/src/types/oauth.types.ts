import { type Profile as FacebookProfile } from 'passport-facebook';
import { type Profile as GitHubProfile } from 'passport-github2';
import { type Profile as GoogleProfile } from 'passport-google-oauth20';
import { type Profile as LinkedinProfile } from 'passport-linkedin-oauth2';

export interface LinkedInOpenIDProfile extends LinkedinProfile {
  email?: string;
  picture?: string;
}

export interface SlackOAuthProfile {
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

export type OAuthProfile =
  | GitHubProfile
  | GoogleProfile
  | FacebookProfile
  | LinkedInOpenIDProfile
  | SlackOAuthProfile;

export const ProviderEnum = {
  github: 'github',
  google: 'google',
  facebook: 'facebook',
  linkedin: 'linkedin',
  slack: 'slack',
} as const;

export type ProviderTypes = (typeof ProviderEnum)[keyof typeof ProviderEnum];
