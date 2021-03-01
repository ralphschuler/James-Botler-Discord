import crypto from 'crypto';
import config from '../config';

const SALT = config.salt || 'hush-hush';

export default function _method(data) {
	const buffer = Buffer.from(data, 'utf8');
	return crypto.createHmac('sha256', SALT).update(buffer).digest('hex');
}
