"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnowflakeClient = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const SDK = require("snowflake-sdk");
const utils_1 = require("@appolo/utils");
let SnowflakeClient = class SnowflakeClient {
    async get() {
        try {
            if (this.moduleOptions.configuration) {
                SDK.configure(this.moduleOptions.configuration);
            }
            let client = SDK.createConnection(this.moduleOptions.connection);
            await utils_1.Promises.fromCallback(c => client.connect(c));
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