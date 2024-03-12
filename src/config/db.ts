import postgres from "pg"
import dotenv from "dotenv";
dotenv.config();
const pg = postgres.Pool

export const pool = new pg({
    user: `${process.env.DB_USER}`,
    host: `${process.env.DB_HOST}`,
    database:`${process.env.DB_NAME}`,
    password: `${process.env.DB_PASSWORD}`,
    port: Number(process.env.DB_PORT),
      connectionString: `${process.env.DB_CONNECTION_LINK}`,
   ssl: {
        rejectUnauthorized: false,
   },
})