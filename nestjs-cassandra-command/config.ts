import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const envDevelopmentName = 'development';
const env = process.env.NODE_ENV || envDevelopmentName;
const appName = 'nestjs-cqrs-es';
const configs = {
  base: {
    ENV: env,
    DEV: env === envDevelopmentName,
    // General
    APP_NAME: process.env.APP_NAME || appName,
    APP_TITLE: process.env.APP_TITLE || 'Item Management',
    APP_DESCRIPTION: process.env.APP_DESCRIPTION || 'Items API Microservice',
    // API
    PREFIX: process.env.APP_PREFIX || 'v1',
    VERSION: process.env.APP_VERSION || '1.0',
    API_EXPLORER_PATH: process.env.APP_API_EXPLORER_PATH || '/api',
    // Server
    HOST: process.env.APP_HOST || '0.0.0.0',
    PORT: process.env.APP_PORT || 7070,
    // Cloud AMQP
    AMQP_URL: process.env.AMQP_URL,
    AMQP_NAME: process.env.AMQP_NAME,
    AMQP_QUEUE: process.env.AMQP_QUEUE,
    // Cassandra
    CASSANDRA_HOST: process.env.CASSANDRA_HOST || '0.0.0.0',
    CASSANDRA_PORT: process.env.CASSANDRA_PORT || 9042,
    CASSANDRA_USERNAME: process.env.CASSANDRA_USERNAME || 'cassandra',
    CASSANDRA_PASSWORD: process.env.CASSANDRA_PASSWORD || 'cassandra',
    CASSANDRA_KEYSPACE: process.env.CASSANDRA_KEYSPACE,
  },
  development: {},
  production: {
    PORT: process.env.APP_PORT || 7071,
  },
  test: {
    PORT: 7072,
  },
};

const config = { ...configs.base, ...configs[env] };

export { config };
