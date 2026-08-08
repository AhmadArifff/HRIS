const fs = require('fs');
let c = fs.readFileSync('src/layout/AppSidebar.tsx', 'utf8');

c = c.replace(/\{\(nav\.new \|\| nav\.pro\) && \([\s\S]*?\}\)`\}\s*\/>/m, 
`                  <div className="ml-auto flex items-center gap-2">
                    {(nav.new || nav.pro) && (
                      <span className="flex items-center gap-1">
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
                      </span>
                    )}
                    <ChevronDownIcon
                      className={\`w-5 h-5 transition-transform duration-200  \${
                        openSubmenu?.type === menuType &&
                        openSubmenu?.index === index
                          ? "rotate-180 text-brand-500"
                          : ""
                      }\`}
                    />
                  </div>
                </>
              )}`
);

fs.writeFileSync('src/layout/AppSidebar.tsx', c);
console.log('Successfully applied regex flex fix for badge + chevron');
