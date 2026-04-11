const fs = require('fs');

let headFile = fs.readFileSync('HEAD-page.tsx', 'utf16le');

const statsBarIndex = headFile.indexOf('      {/* Stats Bar */}');
const pricingIndexHead = headFile.indexOf('      {/* Pricing Section */}');

if (statsBarIndex === -1 || pricingIndexHead === -1) {
  console.log("Could not find delimiters in utf16le.");
  process.exit(1);
}

const middleOriginal = headFile.substring(statsBarIndex, pricingIndexHead);

let currentFile = fs.readFileSync('src/app/page.tsx', 'utf8');
const pricingIndex = currentFile.indexOf('      {/* Pricing Section */}');

const beforePricing = currentFile.substring(0, pricingIndex);
const afterPricing = currentFile.substring(pricingIndex);

fs.writeFileSync('src/app/page.tsx', beforePricing + middleOriginal + afterPricing);
console.log('Restored original middle sections using utf16le!');
