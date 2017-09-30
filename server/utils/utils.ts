const app = require('express')();

export namespace Utils {
  export const isProduction: () => boolean = () => app.get('env') === 'production';
  export const isDevelopment: () => boolean = () => !isProduction();

  export function normalizePort(val) {
    const _port = parseInt(val, 10);
    if (isNaN(_port)) { return val; }
    if (_port >= 0) { return _port; }
    return false;
  }
}
