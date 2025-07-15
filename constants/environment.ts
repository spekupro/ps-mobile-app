export enum EnvEnum {
    DEVELOPMENT = 'development',
    PRELIVE_PRODUCTION = 'prelive-production',
    LIVE_PRODUCTION = 'live-production',
}

export const environment = {
    name: EnvEnum.DEVELOPMENT,
    apiURL: 'http://api.partner.montonio:3031',
    dokobitIdGatewayURL: 'https://id-sandbox.dokobit.com',
    oldPartnerSystemUrl: 'http://partner.montonio:4202',
    intercomApiBase: 'https://api-iam.eu.intercom.io',
    intercomAppId: 'zdcaipo4',
    salvBaseUrl: 'https://demo.salv.com',
};