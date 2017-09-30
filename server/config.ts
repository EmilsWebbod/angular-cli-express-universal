export const Config = {
  port: 3005,
  cookie_secret: process.env.COOKIE_SECRET || 'MyCookieSecret',
  redis_url: process.env.REDISCLOUD_URL || '//127.0.0.1:6379',
};
