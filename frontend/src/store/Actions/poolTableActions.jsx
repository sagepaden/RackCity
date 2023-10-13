export const FETCH_POOL_TABLES = 'FETCH_POOL_TABLES';

export const fetchPoolTables = (poolTables) => {
    return {
        type: FETCH_POOL_TABLES,
        payload: poolTables,
    };
};