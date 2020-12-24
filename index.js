"use strict";
var SnowFlakeModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnowFlakeModule = void 0;
const tslib_1 = require("tslib");
const engine_1 = require("@appolo/engine");
const inject_1 = require("@appolo/inject");
exports.snowFlake = require("snowflake-promise");
const snowflakeProvider_1 = require("./src/snowflakeProvider");
let SnowFlakeModule = SnowFlakeModule_1 = class SnowFlakeModule extends engine_1.Module {
    constructor() {
        super(...arguments);
        this.Defaults = {
            id: "snowFlakeConn",
        };
    }
    static for(options) {
        return { type: SnowFlakeModule_1, options };
    }
    get exports() {
        return [{ id: this.moduleOptions.id, type: snowflakeProvider_1.SnowflakeProvider }];
    }
    beforeModuleInitialize() {
        process.on("exit", () => {
            this.snowflakeProvider.destroy().catch();
        });
    }
    async beforeReset() {
        await this.snowflakeProvider.destroy();
    }
};
tslib_1.__decorate([
    inject_1.inject()
], SnowFlakeModule.prototype, "snowflakeProvider", void 0);
SnowFlakeModule = SnowFlakeModule_1 = tslib_1.__decorate([
    engine_1.module()
], SnowFlakeModule);
exports.SnowFlakeModule = SnowFlakeModule;
//# sourceMappingURL=index.js.map