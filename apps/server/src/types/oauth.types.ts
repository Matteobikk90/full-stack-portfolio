import { type Profile as FacebookProfile } from 'passport-facebook';
import { type Profile as GitHubProfile } from 'passport-github2';
import { type Profile as GoogleProfile } from 'passport-google-oauth20';
import { type Profile as LinkedinProfile } from 'passport-linkedin-oauth2';

export interface LinkedInOpenIDProfile extends LinkedinProfile {
  email?: string;
  picture?: string;
}

export type OAuthProfile =
  | GitHubProfile
  | GoogleProfile
  | FacebookProfile
  | LinkedInOpenIDProfile;

export const ProviderEnum = {
  github: 'github',
  google: 'google',
  facebook: 'facebook',
  linkedin: 'linkedin',
} as const;

export type ProviderTypes = (typeof ProviderEnum)[keyof typeof ProviderEnum];
