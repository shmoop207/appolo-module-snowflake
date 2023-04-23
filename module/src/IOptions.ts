import {ConnectionOptions,ConfigureOptions} from "snowflake-sdk";



export interface IOptions {
    id?: string;
    connection: ConnectionOptions,
    configuration?: ConfigureOptions
}
