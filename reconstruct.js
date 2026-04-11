const fs = require('fs');

const headFile = fs.readFileSync('HEAD-page.tsx', 'utf8');

const statsBarIndex = headFile.indexOf('      {/* Stats Bar */}');
const pricingIndexHead = headFile.indexOf('      {/* Pricing Section */}');

const middleOriginal = headFile.substring(statsBarIndex, pricingIndexHead);

let currentFile = fs.readFileSync('src/app/page.tsx', 'utf8');
const pricingIndex = currentFile.indexOf('      {/* Pricing Section */}');

const beforePricing = currentFile.substring(0, pricingIndex);
const afterPricing = currentFile.substring(pricingIndex);

fs.writeFileSync('src/app/page.tsx', beforePricing + middleOriginal + afterPricing);
console.log('Restored original middle sections!');
