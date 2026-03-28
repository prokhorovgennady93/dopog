const sqlite = require('node:sqlite');
const db = new sqlite.Database('./prisma/dev.db');

try {
  const row = db.prepare("SELECT * FROM Question WHERE id = ?").get('cmn8zx3tz01u730i5tjcyg849');
  
  if (row) {
    console.log('Question Found:');
    console.log(JSON.stringify(row, null, 2));
  } else {
    console.log('Question not found in dev.db.');
  }
} catch (e) {
  console.error('Error querying database:', e.message);
  // Try to list tables
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log('Available tables:', tables.map(t => t.name).join(', '));
}
