"use strict";
import {define, factory, IFactory, inject, factoryMethod, singleton} from '@appolo/inject'
import {ILogger} from '@appolo/logger';
import {IOptions} from "./IOptions";
import {SnowflakeProvider} from "./snowflakeProvider";
import {ConnectionOptions, Snowflake} from "snowflake-promise";

@define()
@singleton()
@factory()
export class SnowflakeClient implements IFactory<Snowflake> {

    @inject() protected logger: ILogger;
    @inject() protected moduleOptions: IOptions;

    public async get(): Promise<Snowflake> {

        try {

            let client = new Snowflake(this.moduleOptions.connection, this.moduleOptions.logging, this.moduleOptions.configuration)

            await client.connect();

            this.logger.info(`connected to snowflake ${this.moduleOptions.id}`);

            return client;

        } catch (e) {

            this.logger.error(`failed to connect to snowFlake ${this.moduleOptions.id}`, {err: e.toString()});

            throw e;
        }
    }
}
