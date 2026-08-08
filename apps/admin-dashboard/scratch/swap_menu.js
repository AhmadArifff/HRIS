const fs = require('fs');

let c = fs.readFileSync('src/layout/AppSidebar.tsx', 'utf8');

// Find the objects for E-commerce and AI Assistant
const ecommStart = c.indexOf('  {\n    icon: (\n      <svg\n        className="fill-current"\n        width="24"\n        height="24"\n        viewBox="0 0 24 24"');
const ecommEnd = c.indexOf('  },\n  {\n    icon: (\n      <svg height="1em" viewBox="0 0 24 24"');
const aiEnd = c.indexOf('  },\n  {\n    icon: <CalenderIcon />,\n    name: "Calendar",');

if (ecommStart !== -1 && ecommEnd !== -1 && aiEnd !== -1) {
    const ecommObj = c.substring(ecommStart, ecommEnd);
    const aiObj = c.substring(ecommEnd + 4, aiEnd); // +4 for '  },\n'
    
    const beforeEcomm = c.substring(0, ecommStart);
    const afterAi = c.substring(aiEnd);
    
    // Swap them
    const newContent = beforeEcomm + aiObj + ',\n' + ecommObj + afterAi;
    fs.writeFileSync('src/layout/AppSidebar.tsx', newContent);
    console.log('Swapped AI Assistant and E-commerce successfully!');
} else {
    console.log('Could not find the indices properly.');
    console.log('ecommStart:', ecommStart);
    console.log('ecommEnd:', ecommEnd);
    console.log('aiEnd:', aiEnd);
}
