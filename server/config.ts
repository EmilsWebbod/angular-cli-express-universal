export const Config = {
  port: 3005,
  cookie_secret: process.env.COOKIE_SECRET || 'MyCookieSecret',
  redis_url: process.env.REDISCLOUD_URL || '//127.0.0.1:6379',
  mongo_db: process.env.MONGODB_URI || 'mongodb://acc01:acc01@localhost/HourPlaner'
};
