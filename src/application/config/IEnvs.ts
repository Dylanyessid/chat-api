export interface IEnvs{
    port: number,
    mongoUri: string,
    jwtSecret: string,
    bcryptSaltRounds: number,
    cloudName:string,
    cloudApiKey:string,
    cloudApiSecret:string
}