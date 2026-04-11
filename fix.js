const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

const regex = /Платформа.*mb-8 sm:mb-12/s;
const match = regex.exec(content);

if (match) {
  content = content.replace(regex, `Платформа для подготовки водителей и консультантов по перевозке опасных грузов. Интерактивные тесты с ответами и комментариями. Начните бесплатно прямо сейчас.
            </p>

            <div className="mb-8 sm:mb-12`);
  fs.writeFileSync('src/app/page.tsx', content);
  console.log("Replaced successfully!");
} else {
  console.log("No match found!");
}
