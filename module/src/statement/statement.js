"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statement = void 0;
const utils_1 = require("@appolo/utils");
class Statement {
    constructor(connection, executeOptions) {
        this.connection = connection;
        this.executeOptions = executeOptions;
        this._rows = null;
        this._statement = null;
        this._execPromise = null;
    }
    execute() {
        if (this._execPromise) {
            throw new Error("StatementAlreadyExecutedError");
        }
        this._execPromise = new Promise((resolve, reject) => {
            this._statement = this.connection.execute(Object.assign(Object.assign({}, this.executeOptions), { complete: (err, stmt, rows) => {
                    err ? reject(err) : resolve(this._rows = rows);
                } }));
        });
        return this._execPromise;
    }
    async cancel() {
        await utils_1.Promises.fromCallback(c => this._statement.cancel(c));
    }
    getRows() {
        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }
        return this._execPromise.then(() => this._rows);
    }
    streamRows(options = {}) {
        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }
        return this._statement.streamRows(options);
    }
    getSqlText() {
        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }
        return this._statement.getSqlText();
    }
    getStatus() {
        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }
        return this._statement.getStatus();
    }
    getColumns() {
        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }
        return this._statement.getColumns();
    }
    getColumn(columnIdentifier) {
        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }
        return this._statement.getColumn(columnIdentifier);
    }
    getNumRows() {
        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }
        return this._statement.getNumRows();
    }
    getNumUpdatedRows() {
        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }
        return this._statement.getNumUpdatedRows();
    }
    getSessionState() {
        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }
        return this._statement.getSessionState();
    }
    getRequestId() {
        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }
        return this._statement.getRequestId();
    }
    getStatementId() {
        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }
        return this._statement.getStatementId();
    }
}
exports.Statement = Statement;
//# sourceMappingURL=statement.js.map