// Required for vite svg plugin in TS files.
/// <reference types="vite-plugin-svgr/client" />

import PersonalLogo from '@/assets/images/logo.svg?react';

export const Logo = () => <PersonalLogo className="fill-foreground" />;
