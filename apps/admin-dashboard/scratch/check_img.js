const fs = require('fs');
let c = fs.readFileSync('src/components/ecommerce/products/ProductsTable.tsx','utf8');
const m = c.match(/src="[^"]+"/g);
if (m) console.log([...new Set(m)].slice(0, 20));
