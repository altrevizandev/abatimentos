import { prisma } from "./index.js";
import { hash } from 'bcryptjs';

async function main() {

  let password_hashed = await hash("Alt@123456", 12);

  await prisma.account.upsert({
    where: { email: 'andre.trevizan@tirol.com.br' },
    update: {},
    create: {
      name: 'Andre Lucas Trevizan',
      email: 'andre.trevizan@tirol.com.br',
      password: password_hashed
    }
  });

  await prisma.role.upsert({
    where: { slug: 'admin' },
    update: {},
    create: {
      name: 'Admin',
      slug: 'admin',
    },
  });

  await prisma.role.upsert({
    where: { slug: 'operator' },
    update: {},
    create: {
      name: 'Operator',
      slug: 'operator',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)

    await prisma.$disconnect()

    process.exit(1)
  })