const fs = require('fs');

let c = fs.readFileSync('src/layout/AppSidebar.tsx', 'utf8');

c = c.replace(
  'className={` ${\n                  openSubmenu?.type === menuType && openSubmenu?.index === index\n                    ? "menu-item-icon-active"\n                    : "menu-item-icon-inactive"\n                }`}',
  'className={`menu-item-icon-size ${\n                  openSubmenu?.type === menuType && openSubmenu?.index === index\n                    ? "menu-item-icon-active"\n                    : "menu-item-icon-inactive"\n                }`}'
);

c = c.replace(
  'className={`${',
  'className={`menu-item-icon-size ${'
); // for the link item below

// Replace the badge logic
const oldBadge = `<span className="flex items-center gap-1 ml-auto">
                      {nav.new && (
                        <span className={\`menu-dropdown-badge-active menu-dropdown-badge \`}>
                          NEW
                        </span>
                      )}
                      {nav.pro && (
                        <span className={\`menu-dropdown-badge-active menu-dropdown-badge \`}>
                          PRO
                        </span>
                      )}
                    </span>`;

const newBadge = `<span className="absolute right-10 ml-auto flex items-center gap-1">
                      {nav.new && (
                        <span className={\`menu-dropdown-badge-inactive menu-dropdown-badge\`}>
                          new
                        </span>
                      )}
                      {nav.pro && (
                        <span className={\`menu-dropdown-badge-inactive menu-dropdown-badge\`}>
                          pro
                        </span>
                      )}
                    </span>`;

c = c.replace(oldBadge, newBadge);

// xl:justify-center for the button? The user snippet had xl:justify-center.
c = c.replace('? "lg:justify-center"\n                  : "lg:justify-start"', '? "xl:justify-center"\n                  : "xl:justify-start"');

fs.writeFileSync('src/layout/AppSidebar.tsx', c);
console.log('Styles updated');
