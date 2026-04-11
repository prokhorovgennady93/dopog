const { execSync } = require('child_process');
const fs = require('fs');

const headContent = execSync('git show HEAD:src/app/page.tsx', { encoding: 'utf8' });

let currentFile = fs.readFileSync('src/app/page.tsx', 'utf8');

const goodCatalogIndex = headContent.indexOf('      {/* Courses Catalog */}');
const pricingIndexHead = headContent.indexOf('      {/* Pricing Section */}');

if (goodCatalogIndex === -1 || pricingIndexHead === -1) {
  console.log("Could not find section boundaries in HEAD");
  process.exit(1);
}

const cleanMiddle = headContent.substring(goodCatalogIndex, pricingIndexHead);

const catalogIndexCurrent = currentFile.indexOf('      {/* Courses Catalog */}');
const pricingIndexCurrent = currentFile.indexOf('      {/* Pricing Section */}');

const beforeCorrupt = currentFile.substring(0, catalogIndexCurrent);
const afterCorrupt = currentFile.substring(pricingIndexCurrent);

const finalFile = beforeCorrupt + cleanMiddle + afterCorrupt;

fs.writeFileSync('src/app/page.tsx', finalFile, 'utf8');
console.log('Restored perfectly!');
