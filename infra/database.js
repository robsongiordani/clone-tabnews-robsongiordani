import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  if (typeof queryObject === "string") {
    queryObject = {
      text: queryObject,
      values: [],
    };
  }

  if (!Array.isArray(queryObject.values)) {
    queryObject.values = [];
  }

  await client.connect();

  try {
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

export default {
  query,
};
