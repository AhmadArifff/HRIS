const fs = require('fs');

const videoInput = 'src/components/video-generator/MessageInput.tsx';
if (fs.existsSync(videoInput)) {
    let c = fs.readFileSync(videoInput, 'utf8');
    c = c.replace(/"\.\/[^"]*google\.svg"/g, '"/images/brand/brand-01.svg"');
    fs.writeFileSync(videoInput, c);
}

const videoList = 'src/components/video-generator/MessageList.tsx';
if (fs.existsSync(videoList)) {
    let c = fs.readFileSync(videoList, 'utf8');
    c = c.replace(/"\.\/[^"]*google\.svg"/g, '"/images/brand/brand-01.svg"');
    c = c.replace(/"\.\/[^"]*video-thumb\.png"/g, '"/images/cards/card-01.png"');
    fs.writeFileSync(videoList, c);
}

const productsTable = 'src/components/ecommerce/products/ProductsTable.tsx';
if (fs.existsSync(productsTable)) {
    let c = fs.readFileSync(productsTable, 'utf8');
    c = c.replace(/"\.\/React.js E-commerce Products _ TailAdmin - React.js Admin Dashboard Template_files\/product-(\d+)\.jpg"/g, '"/images/product/product-$1.jpg"');
    fs.writeFileSync(productsTable, c);
}

console.log('Fixed image paths');
