import { QueryResult } from 'pg';
import { pool } from '../connection';

export async function count(): Promise<QueryResult> {
    return pool.query(`SELECT COUNT(1) FROM chatbot`);
}