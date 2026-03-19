import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  console.log("Credenciais do Postgres:", {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
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

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error("Erro ao conectar ou executar query no banco:");
    console.error(error);
    throw error;
  } finally {
    await client.end(); // 🔥 MUITO IMPORTANTE
  }
}

export default {
  query,
};
