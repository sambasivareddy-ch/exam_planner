import postgres from 'pg';
import dotenv from 'dotenv';

// Config Database Credentials
dotenv.config({
    path: "/Users/samba-17793/Projects/exam_planner/server/config/.db.env"
});

const { Client } = postgres;

export const PG_CLIENT = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
});

// Config the Postgres Database and creates a Clients Connection
const EstablishPGConnection = async (callback) => {
    const start = Date.now();

    console.log('Establishing the PG Connection');
    await PG_CLIENT.connect()
        .then(() => {
            console.log(`Established the PG Connection, Time Taken: ${Date.now() - start}ms`);
            callback();
        })
        .catch((err) => {
            console.error(err);
        })
}

export default EstablishPGConnection;