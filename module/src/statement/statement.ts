import {Readable} from 'stream';
import {
    Connection,
    Statement as SnowflakeStatement,
    Column,
    StatementStatus,
    StreamOptions,
    SnowflakeError
} from "snowflake-sdk";
import {ExecuteOptions} from "./executeOptions";
import {Promises} from '@appolo/utils';

export class Statement<T> {
    private _rows: T[] = null;
    private _statement: SnowflakeStatement = null;
    private _execPromise: Promise<T[]> = null;

    constructor(private readonly connection: Connection, private readonly executeOptions: ExecuteOptions) {

    }

    public execute(): Promise<T[]> {
        if (this._execPromise) {
            throw new Error("StatementAlreadyExecutedError");
        }

        this._execPromise = new Promise((resolve, reject) => {

            this._statement = this.connection.execute({
                ...this.executeOptions,
                complete: (err: SnowflakeError, stmt: SnowflakeStatement, rows: any[]) => {
                    err ? reject(err) : resolve(this._rows = rows);
                }
            });
        });

        return this._execPromise;
    }

    public async cancel() {
        await Promises.fromCallback(c => this._statement.cancel(c));
    }


    public getRows() {
        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }
        return this._execPromise.then(() => this._rows);
    }

    public streamRows(options: StreamOptions = {}): Readable {
        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }
        return this._statement.streamRows(options);
    }

    public getSqlText(): string {
        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }
        return this._statement.getSqlText();
    }

    public getStatus(): StatementStatus {
        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }
        return this._statement.getStatus();
    }

    public getColumns(): Column[] {
        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }
        return this._statement.getColumns();
    }

    public getColumn(columnIdentifier: string | number): Column {

        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }

        return this._statement.getColumn(columnIdentifier);
    }

    public getNumRows(): number {

        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }

        return this._statement.getNumRows();
    }

    public getNumUpdatedRows(): number {

        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }

        return this._statement.getNumUpdatedRows();
    }

    public getSessionState() {

        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }

        return this._statement.getSessionState();
    }

    public getRequestId(): string {

        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }

        return this._statement.getRequestId();
    }


    public getStatementId(): string {

        if (!this._execPromise) {
            throw new Error("StatementNotExecutedError");
        }

        return this._statement.getStatementId();
    }
}