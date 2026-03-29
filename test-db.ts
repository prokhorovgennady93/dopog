import { db } from "./src/lib/db";
const url = process.env.DATABASE_URL || "file:./dev.db";
const cleanUrl = url.replace('file:', '');
console.log(cleanUrl);
db.user.findFirst().then(console.log).catch(console.error);
