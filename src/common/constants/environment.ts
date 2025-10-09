import Constants from 'expo-constants';

export enum EnvironmentEnum {
    DEVELOPMENT = 'development',
    PRELIVE = 'prelive',
    LIVE = 'live',
}

const appEnv = Constants.expoConfig?.extra?.appEnv || EnvironmentEnum.DEVELOPMENT;

let loadedEnvironment;

switch (appEnv) {
    case EnvironmentEnum.PRELIVE:
        loadedEnvironment = require('./environment.prelive').default;
        break;
    case EnvironmentEnum.LIVE:
        loadedEnvironment = require('./environment.live').default;
        break;
    case EnvironmentEnum.DEVELOPMENT:
    default:
        loadedEnvironment = require('./environment.development').default;
        break;
}

export const environment = loadedEnvironment;
export default environment;
