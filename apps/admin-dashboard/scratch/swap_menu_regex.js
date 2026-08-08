const fs = require('fs');
let c = fs.readFileSync('src/layout/AppSidebar.tsx', 'utf8');

// The objects look like this:
//   {
//     icon: ( <svg>...</svg> ),
//     name: "E-commerce",
//     ...
//   },
//   {
//     icon: ( <svg>...</svg> ),
//     name: "AI Assistant",
//     ...
//   },

const ecommPattern = /  \{\s+icon: \(\s+<svg[\s\S]*?name: "E-commerce",[\s\S]*?  \},/m;
const aiPattern = /  \{\s+icon: \(\s+<svg[\s\S]*?name: "AI Assistant",[\s\S]*?  \},/m;

const ecommMatch = c.match(ecommPattern);
const aiMatch = c.match(aiPattern);

if (ecommMatch && aiMatch) {
    const ecommText = ecommMatch[0];
    const aiText = aiMatch[0];
    
    console.log("Found E-commerce:");
    console.log(ecommText.substring(0, 50) + "...");
    console.log("Found AI Assistant:");
    console.log(aiText.substring(0, 50) + "...");
    
    // Now replace them. They are consecutive in the array.
    // We can just replace the concatenated string.
    const combinedStr = ecommText + '\n' + aiText;
    const replacementStr = aiText + '\n' + ecommText;
    
    if (c.includes(combinedStr)) {
        c = c.replace(combinedStr, replacementStr);
        fs.writeFileSync('src/layout/AppSidebar.tsx', c);
        console.log("Successfully swapped E-commerce and AI Assistant!");
    } else {
        console.log("They are not exactly consecutive, trying independent replacement...");
        // Wait, what if there's a comma mismatch or spaces between them?
        // Let's replace the whole block by extracting from `const navItems` to `Calendar`
        const ecommStartIndex = c.indexOf(ecommText);
        const aiStartIndex = c.indexOf(aiText);
        console.log("ecommStart", ecommStartIndex);
        console.log("aiStart", aiStartIndex);
        
        // Actually, just replace both. Replace ecomm with a placeholder, ai with ecomm, placeholder with ai.
        c = c.replace(ecommText, '___ECOMMERCE_PLACEHOLDER___');
        c = c.replace(aiText, ecommText);
        c = c.replace('___ECOMMERCE_PLACEHOLDER___', aiText);
        
        fs.writeFileSync('src/layout/AppSidebar.tsx', c);
        console.log("Successfully swapped using placeholder strategy!");
    }
} else {
    console.log("Could not find the matches using regex.");
}
