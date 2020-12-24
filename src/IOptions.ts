import {ConnectionOptions} from "snowflake-promise";

export interface ConfigureOptions {

    ocspFailOpen?: boolean;

    insecureConnect?: boolean;
}

export interface LoggingOptions {
    logSql?: (sqlText: string) => void;

    logLevel?: 'error' | 'warn' | 'debug' | 'info' | 'trace';
}


export interface IOptions {
    id?: string;
    connection: ConnectionOptions,
    configuration?: ConfigureOptions
    logging?: LoggingOptions
}
