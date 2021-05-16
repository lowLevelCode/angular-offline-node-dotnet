import { DBConfig } from 'ngx-indexed-db';

export enum TableNameEnum {
    CACHE = 'cache',
    USERS = 'users',
}

export interface CacheSchema {
    url:string;
    tableName:string;
    method:string;
}

export const dbConfig: DBConfig  = {
  name: 'local-db',
  version: 1,
  objectStoresMeta: [
        {
            store: TableNameEnum.CACHE,
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'url', keypath: 'url', options: { unique: false } },
                { name: 'tableName', keypath: 'dataName', options: { unique: false } },
                { name: 'method', keypath: 'method', options: { unique: false } },
            ]
        },
        {
            store: TableNameEnum.USERS,
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'firstname', keypath: 'firstname', options: { unique: false } },
                { name: 'lastname', keypath: 'lastname', options: { unique: false } },
                { name: 'email', keypath: 'email', options: { unique: false } },
            ]
        },
    ]
};