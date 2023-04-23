"use strict";
import {define, factory, IFactory, inject, factoryMethod, singleton} from '@appolo/inject'
import {ILogger} from '@appolo/logger';
import {IOptions} from "./IOptions";
import { Connection} from "snowflake-sdk";
import * as SDK from "snowflake-sdk";
import {Promises} from '@appolo/utils';

@define()
@singleton()
@factory()
export class SnowflakeClient implements IFactory<Connection> {

    @inject() protected logger: ILogger;
    @inject() protected moduleOptions: IOptions;

    public async get(): Promise<Connection> {

        try {

            if (this.moduleOptions.configuration) {
                SDK.configure(this.moduleOptions.configuration)
            }

            let client = SDK.createConnection(this.moduleOptions.connection)

            await Promises.fromCallback(c => client.connect(c));

            this.logger.info(`connected to snowflake ${this.moduleOptions.id}`);

            return client;

        } catch (e) {

            this.logger.error(`failed to connect to snowFlake ${this.moduleOptions.id}`, {err: e.toString()});

            throw e;
        }
    }
}
