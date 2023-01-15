/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  // !STARTERCONF Change the siteUrl
  /** Without additional '/' on the end, e.g. https://www.wanfahdiva.me/ */
  siteUrl: 'https://www.wanfahdiva.me',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
