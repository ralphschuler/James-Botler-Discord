const crypto = require('crypto')

const SALT = process.env.SALT || 'hush-hush'

module.exports = hash = (data) => {
    const buffer = Buffer.from(data, 'utf8')
    return crypto.createHmac('sha256', SALT).update(buffer).digest('hex')
}