### Aa-front-boilerplate

To get ssl we need [certbot](https://certbot.eff.org/)

add ssl 
`sudo certbot certonly --standalone -d yoursite.com -d www.yoursite.com`

renew ssl
`sudo certbot renew --dry-run`

location of generated certs is `/etc/letsencrypt/live/yoursite.com/`

##### Dependency "why" description:
```json
{
    "babel-plugin-module-resolver": "absolute path in imports",
    "compression": "it's gziping for ssr",
    "express": "server. It's most popular and simple server",
    "isomorphic-unfetch": "universal fetching",
    "lru-cache": "it's inmemeory caching for ssr",
    "next-redux-wrapper": "it is required library for react+redux+next",
    "nprogress": "nice looking simple pageloading indicator like on youtube",
    "redux": "most popular state manager",
    "redux-devtools-extension": "devtools for redux",
    "redux-thunk": "async redux dispatching",
    "redux-promise-middleware": "a little bit easier work with async disaptching",
    "babel-plugin-transform-decorators": "I like decorators @decorator<3",
    "babel-preset-env": "babel preset env",
    "helmet": "protect our request headers",
    "immutability-helper": "easy and beauty way (mongodb like) to update state",
    "autoprefixer": "add -webkit-, -moz-, -ms- and etc."
}
```
