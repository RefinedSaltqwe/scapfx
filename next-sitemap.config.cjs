/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://scapcreative.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/admin", "/dashboard", "/account"], // Exclude private routes
  changefreq: "daily",
};
