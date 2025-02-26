export interface IMongoConnection {

    connect(): Promise<void>

}