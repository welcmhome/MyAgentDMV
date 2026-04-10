import { Pool, type PoolConfig } from "pg";

/**
 * Reuse one Pool across hot reloads in development so connections are not exhausted.
 * Lazy-init avoids requiring DATABASE_URL at Next.js build time.
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#singleton
 */
const globalForPool = globalThis as typeof globalThis & {
  __agentDmvPgPool?: Pool;
};

let productionPool: Pool | undefined;

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it to your environment (e.g. .env.local from Neon).",
    );
  }

  const config: PoolConfig = {
    connectionString,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  };

  return new Pool(config);
}

function getPool(): Pool {
  if (process.env.NODE_ENV !== "production") {
    if (!globalForPool.__agentDmvPgPool) {
      globalForPool.__agentDmvPgPool = createPool();
    }
    return globalForPool.__agentDmvPgPool;
  }
  productionPool ??= createPool();
  return productionPool;
}

/** Shared pool; connects on first use (not at import time). */
export const pool: Pool = new Proxy({} as Pool, {
  get(_target, prop, _receiver) {
    const real = getPool();
    const value = Reflect.get(real, prop, real);
    if (typeof value === "function") {
      return (value as (...args: unknown[]) => unknown).bind(real);
    }
    return value;
  },
});
