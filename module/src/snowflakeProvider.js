"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnowflakeProvider = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
let SnowflakeProvider = class SnowflakeProvider {
    destroy() {
        return this.snowflakeClient.destroy();
    }
    createStatement(options) {
        return this.snowflakeClient.createStatement(options);
    }
    execute(sqlText, binds) {
        return this.snowflakeClient.execute(sqlText, binds);
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