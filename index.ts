"use strict";
import {Module, module, IModuleParams} from '@appolo/engine';
import {inject} from '@appolo/inject';
import {IOptions} from "./src/IOptions";

export import snowFlake = require("snowflake-promise");
import {SnowflakeProvider} from "./src/snowflakeProvider";

@module()
export class SnowFlakeModule extends Module<IOptions> {

    @inject() snowflakeProvider: SnowflakeProvider

    public static for(options: IOptions): IModuleParams {
        return {type: SnowFlakeModule, options}
    }

    protected readonly Defaults: Partial<IOptions> = {
        id: "snowFlakeConn",
    };

    public get exports() {
        return [{id: this.moduleOptions.id, type: SnowflakeProvider}];
    }

    public beforeModuleInitialize() {
        process.on("exit", () => {
            this.snowflakeProvider.destroy().catch()
        })
    }

    public async beforeReset() {

        await this.snowflakeProvider.destroy()
    }
}
