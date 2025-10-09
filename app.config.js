const appConfig = require('./app.json');

const APP_ENV = process.env.APP_ENV || 'development';

module.exports = {
    ...appConfig,
    expo: {
        ...appConfig.expo,
        extra: {
            ...appConfig.expo.extra,
            appEnv: APP_ENV,
        },
    },
};
