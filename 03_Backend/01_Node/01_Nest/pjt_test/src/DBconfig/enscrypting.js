import { encrypt, decrypt } from './crypt';
// const { config } = require('dotenv')
// const yaml = require('js-yaml')
// const fs = require('fs')
// const cfgHelper = require('./server/helpers/config')

// config({path: '.env.dev'})

const DB_HOST = encrypt('', 1);
const DB_PORT = encrypt('', 1);
const DB_TYPE = encrypt('', 1);
const DB_NAME = encrypt('', 1);
const DB_USER = encrypt('', 1);
const DB_PASS = encrypt('', 1);

console.log(`
DB_HOST = '${DB_HOST}'
DB_PORT = '${DB_PORT}'
DB_TYPE = '${DB_TYPE}'
DB_NAME = '${DB_NAME}'
DB_USER = '${DB_USER}'
DB_PASS = '${DB_PASS}'
`);

console.log(`
${decrypt(DB_HOST, 1)}
${decrypt(DB_PORT, 1)}
${decrypt(DB_TYPE, 1)}
${decrypt(DB_NAME, 1)}
${decrypt(DB_USER, 1)}
${decrypt(DB_PASS, 1)}
`);

// const appconfig = yaml.safeLoad(
//   cfgHelper.parseConfigValue(
//     fs.readFileSync('./config.yml', 'utf8')
//   )
// )

// console.log(appconfig)
// console.log(process.env.DB_HOST)
