import {IModuleParams, Module, module} from "@appolo/engine";
import {IOptions} from "./src/IOptions";
import {SnowflakeProvider} from "./src/snowflakeProvider";
import {inject} from '@appolo/inject';

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
