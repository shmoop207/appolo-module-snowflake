import {define, inject, singleton} from '@appolo/inject'
import {Snowflake} from "snowflake-promise";
import {Statement, ExecuteOptions} from "snowflake-promise";
import {clearInterval} from "timers";
import {ILogger} from '@appolo/logger';


@define()
@singleton()
export class SnowflakeProvider {

    @inject() protected logger: ILogger;
    @inject() protected snowflakeClient: Snowflake;

    public destroy() {
        return this.snowflakeClient.destroy();
    }

    public createStatement(options: ExecuteOptions): Statement {
        return this.snowflakeClient.createStatement(options);
    }

    public execute<T>(sqlText: string, binds?: any[]): Promise<T[]> {
        return this.snowflakeClient.execute(sqlText, binds);

    }
}
