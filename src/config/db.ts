import postgres from "pg"
import dotenv from "dotenv";
dotenv.config();
const pg = postgres.Pool

export const pool = new pg({
    // user: `${process.env.DB_USER}`,
    // host: `${process.env.DB_HOST}`,
    // database:`${process.env.DB_NAME}`,
    // password: `${process.env.DB_PASSWORD}`,
    // port: Number(process.env.DB_PORT),
      connectionString: `${process.env.DB_CONNECTION_LINK}`,
   ssl: {
        rejectUnauthorized: false,
   },
    max: 10,         // number of connections
  idleTimeoutMillis: 30000, // close idle clients after 30s
  connectionTimeoutMillis: 5000, // return error if cannot connect in 5s
})



