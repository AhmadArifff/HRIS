const fs = require('fs');
const path = 'src/components/ecommerce/invoices/InvoicesTable.tsx';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(/<div className="z-10" data-popper-placement="bottom-end" style={{}}>/g, '<div className="z-10 hidden absolute right-0 top-full mt-2" data-popper-placement="bottom-end" style={{}}>');

fs.writeFileSync(path, code);
console.log('Fixed dropdowns');
