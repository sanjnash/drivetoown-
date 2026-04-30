export const SOCIAL_LINKS = [
  {
    platform: 'Facebook',
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? '#',
    ariaLabel: 'Follow DriveToOwn on Facebook',
  },
  {
    platform: 'Instagram',
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '#',
    ariaLabel: 'Follow DriveToOwn on Instagram',
  },
  {
    platform: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? '#',
    ariaLabel: 'Connect with DriveToOwn on LinkedIn',
  },
] as const;
