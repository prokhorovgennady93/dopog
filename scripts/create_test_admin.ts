import { PrismaClient } from '@prisma/client'
import { PrismaNodeSQLite } from "prisma-adapter-node-sqlite"
import bcrypt from 'bcryptjs'

const adapter = new PrismaNodeSQLite({ url: "file:./dev.db" })
const prisma = new PrismaClient({ adapter })

async function main() {
  const phone = '79613002646'
  const password = '3ghZ3Z32'
  const hashedPassword = await bcrypt.hash(password, 10)
  
  const user = await prisma.user.upsert({
    where: { phone },
    update: { 
      password: hashedPassword, 
      isAdmin: true, 
      hasFullAccess: true 
    },
    create: { 
      phone, 
      password: hashedPassword, 
      isAdmin: true, 
      hasFullAccess: true, 
      name: 'Admin Test' 
    }
  })
  console.log(`Пользователь ${user.phone} успешно добавлен/обновлен с правами администратора!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
