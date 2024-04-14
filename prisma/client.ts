import { connect } from '@tidbcloud/serverless';
import { PrismaTiDBCloud } from '@tidbcloud/prisma-adapter';
import { PrismaClient } from '@prisma/client';

// setup
const connectionString = `${process.env.DATABASE_URL}`;

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
 var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

// Initialize Prisma Client
const connection = connect({ url: connectionString });
const adapter = new PrismaTiDBCloud(connection);
const prisma = globalThis.prisma ?? new PrismaClient({ adapter });

// Planet scale

// const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma