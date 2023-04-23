"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnowflakeProvider = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const utils_1 = require("@appolo/utils");
const statement_1 = require("./statement/statement");
let SnowflakeProvider = class SnowflakeProvider {
    async destroy() {
        await utils_1.Promises.fromCallback(c => this.snowflakeClient.destroy(c));
    }
    createStatement(options) {
        return new statement_1.Statement(this.snowflakeClient, options);
    }
    async execute(sqlText, binds) {
        const stmt = this.createStatement({ sqlText, binds });
        let rows = await stmt.execute();
        return rows;
    }
    client() {
        return this.snowflakeClient;
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)()
], SnowflakeProvider.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inject_1.inject)()
], SnowflakeProvider.prototype, "snowflakeClient", void 0);
SnowflakeProvider = tslib_1.__decorate([
    (0, inject_1.define)(),
    (0, inject_1.singleton)()
], SnowflakeProvider);
exports.SnowflakeProvider = SnowflakeProvider;
//# sourceMappingURL=snowflakeProvider.js.map