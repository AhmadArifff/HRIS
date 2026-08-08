const fs = require('fs');
const writeComp = (name, htmlFile) => {
    let jsx = fs.readFileSync(htmlFile, 'utf8');
    const component = `import React from 'react';

export const ${name} = () => {
  return (
    <>
      ${jsx}
    </>
  );
};
`;
    fs.writeFileSync(`src/components/image-generator/${name}.tsx`, component);
};

writeComp('ChatHeader', 'scratch/image_header.jsx');
writeComp('MessageList', 'scratch/image_list.jsx');
writeComp('MessageInput', 'scratch/image_input.jsx');
writeComp('ChatSidebar', 'scratch/image_sidebar.jsx');
