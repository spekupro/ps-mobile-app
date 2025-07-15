export enum AuthStep {
    LOGIN = 'login',
    SELECT_USER = 'selectUser',
}

export type DokobitLogin =
    | {
          nextStep: AuthStep.LOGIN;
      }
    | {
          nextStep: AuthStep.SELECT_USER;
          users: { uuid: string; email: string }[];
      };

export interface DokobitSession {
    dokobitToken: string;
}

export interface EidUser {
    uuid: string;
    email: string;
}