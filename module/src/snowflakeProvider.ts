import {define, inject, singleton} from '@appolo/inject'
import {Connection} from "snowflake-sdk";
import {ILogger} from '@appolo/logger';
import {Promises} from '@appolo/utils';
import {ExecuteOptions} from "./statement/executeOptions";
import {Statement} from "./statement/statement";


@define()
@singleton()
export class SnowflakeProvider {

    @inject() protected logger: ILogger;
    @inject() protected snowflakeClient: Connection;

    public async destroy(): Promise<void> {
        await Promises.fromCallback(c => this.snowflakeClient.destroy(c));
    }

    public createStatement<T>(options: ExecuteOptions): Statement<T> {
        return new Statement(this.snowflakeClient, options);
    }

    public async execute<T>(sqlText: string, binds?: any[]): Promise<T[]> {
        const stmt = this.createStatement<T>({sqlText, binds});
        let rows = await stmt.execute();
        return rows;
    }

    public client(): Connection {
        return this.snowflakeClient;
    }
}
