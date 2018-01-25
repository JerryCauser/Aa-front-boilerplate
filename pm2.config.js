module.exports = {
    apps : [
    {
      name      : 'aa-front-boilerplate',
      script    : 'server/index.js',
      instances : 'max',
      exec_mode : 'cluster',
      env_production : {
        "NODE_ENV": 'production',
        "PORT": 8080
      }
    }
  ]
}

