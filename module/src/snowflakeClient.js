"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnowflakeClient = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const snowflake_promise_1 = require("snowflake-promise");
let SnowflakeClient = class SnowflakeClient {
    async get() {
        try {
            let client = new snowflake_promise_1.Snowflake(this.moduleOptions.connection, this.moduleOptions.logging, this.moduleOptions.configuration);
            await client.connect();
            this.logger.info(`connected to snowflake ${this.moduleOptions.id}`);
            return client;
        }
        catch (e) {
            this.logger.error(`failed to connect to snowFlake ${this.moduleOptions.id}`, { err: e.toString() });
            throw e;
        }
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)()
], SnowflakeClient.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inject_1.inject)()
], SnowflakeClient.prototype, "moduleOptions", void 0);
SnowflakeClient = tslib_1.__decorate([
    (0, inject_1.define)(),
    (0, inject_1.singleton)(),
    (0, inject_1.factory)()
], SnowflakeClient);
exports.SnowflakeClient = SnowflakeClient;
//# sourceMappingURL=snowflakeClient.js.map