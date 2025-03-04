const dotenv = require('dotenv');

let ENV_FILE_NAME = '.env';
try {
	dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || 'http://localhost:7001,http://localhost:7002';

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || 'http://localhost:3000';

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost/medusa-starter-default';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const plugins = [
	`medusa-fulfillment-manual`,
	`medusa-payment-manual`,
	{
		resolve: `@medusajs/file-local`,
		options: {
			upload_dir: 'uploads',
		},
	},
	{
		resolve: '@rigby-software-house/mercurjs-vendor',
		options: {
      serve: false,
      path: '/',
			backend: 'https://backend.mercur.madlogic.dev',
			develop: {
				open: false,
			},
		},
	},
	{
		resolve: '@medusajs/admin',
		options: {
      serve: false,
			path: '/',
			backend: 'https://backend.mercur.madlogic.dev',
			develop: {
				open: false,
			},
		},
	},
];

const modules = {
	eventBus: {
		resolve: '@medusajs/event-bus-redis',
		options: {
			redisUrl: REDIS_URL,
		},
	},
	cacheService: {
		resolve: '@medusajs/cache-redis',
		options: {
			redisUrl: REDIS_URL,
		},
	},
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
	jwtSecret: process.env.JWT_SECRET,
	cookieSecret: process.env.COOKIE_SECRET,
	store_cors: STORE_CORS,
	database_url: DATABASE_URL,
	admin_cors: ADMIN_CORS,
	redis_url: REDIS_URL
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
	projectConfig,
	plugins,
	modules,
};
