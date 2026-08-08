const fs = require('fs');
let c = fs.readFileSync('src/components/ecommerce/products/ProductsTable.tsx','utf8');
// Fix disabled="" or checked=""
c = c.replace(/disabled="[^"]*"/g, 'disabled');
c = c.replace(/checked="[^"]*"/g, 'defaultChecked');
c = c.replace(/selected="[^"]*"/g, 'defaultValue');
c = c.replace(/aria-disabled="([^"]*)"/g, 'aria-disabled={$1}');

fs.writeFileSync('src/components/ecommerce/products/ProductsTable.tsx', c);
