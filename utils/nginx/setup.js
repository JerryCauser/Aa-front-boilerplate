const fs = require('fs')
const {join} = require('path')
const {exec} = require('child_process')
const {siteName, port} = require('../config')

const key = {
  siteName: /%SITE_NAME%/gm,
  port: /%PORT%/gm,
  certificatePath: /%SSL_CERTIFICATE_PATH%/gm,
  certificateKeyPath: /%SSL_CERTIFICATE_KEY_PATH%/gm,
}

let nginxConf = fs.readFileSync(join(__dirname, './nginx.conf')).toString()

let nginxPath, reloadCommand
switch (process.platform) {
  case 'darwin':
    nginxPath = '/usr/local/etc/nginx/servers';
    reloadCommand = 'nginx -s reload'
    break
  default:
    nginxPath = '/etc/nginx/sites-available';
    reloadCommand = 'systemctl reload nginx'
}

const nginxConfDestination = join(nginxPath, siteName)
const certificateDestination = `/etc/letsencrypt/live/${siteName}/fullchain.pem`
const certificateKeyDestination = `/etc/letsencrypt/live/${siteName}/privkey.pem`

nginxConf = nginxConf.replace(key.siteName, siteName)
  .replace(key.port, port)
  .replace(key.certificatePath, certificateDestination)
  .replace(key.certificateKeyPath, certificateKeyDestination)

fs.writeFileSync(nginxConfDestination, nginxConf);

if (process.platform === 'linux') {
  try {
    fs.symlinkSync(nginxConfDestination, join('/etc/nginx/sites-enabled', siteName))
  } catch (e) {
    console.error(e.message)
  }
}

exec(reloadCommand)
