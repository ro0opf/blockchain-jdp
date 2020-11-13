import mariadb, { PoolConnection } from 'mariadb';
import { connectSequelize } from './sequelize';
import l from '../logger';

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5,
});

export default async function connectDB() {
  let conn;
  try {
    conn = await pool.getConnection();
    l.info('MariaDB Connected.');
    await connectSequelize();
  } catch (e) {
    throw e;
  } finally {
    if (conn) conn.release();
  }
}
