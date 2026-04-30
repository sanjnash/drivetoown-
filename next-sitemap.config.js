/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  generateRobotsTxt: false, // We use app/robots.ts
  exclude: ['/admin', '/portal', '/api/*'],
};
