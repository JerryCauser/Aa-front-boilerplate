const {siteName, port} = require('./scripts/config')

module.exports = {
    apps : [
    {
      name      : siteName,
      script    : 'server/index.js',
      instances : 2,
      exec_mode : 'cluster',
      env_production : {
        "NODE_ENV": 'production',
        "PORT": port
      }
    }
  ]
}

