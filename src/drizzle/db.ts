import "dotenv/config"
import { Client } from "pg"
import {drizzle} from "drizzle-orm/node-postgres";
import * as schema from "./schema"


export const client = new Client({
    connectionString: process.env.DATABASE_URL as string
});

const main = async () =>{
    await client.connect(); //connect to the database
    // await drizzle(client);
    // await client.end()
}

main().catch(console.error)

const db = drizzle(client,{schema, logger:true});
export default db;
