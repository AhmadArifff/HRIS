const fs = require('fs');
let c = fs.readFileSync('src/layout/AppSidebar.tsx', 'utf8');

const targetStr = `                  {(nav.new || nav.pro) && (
                    <span className="flex items-center gap-1 ml-auto">
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
                </>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={\`ml-auto w-5 h-5 transition-transform duration-200  \${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }\`}
                />
              )}`;

const replacementStr = `                  <div className="ml-auto flex items-center gap-2">
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
              )}`;

if (c.includes(targetStr)) {
    c = c.replace(targetStr, replacementStr);
    fs.writeFileSync('src/layout/AppSidebar.tsx', c);
    console.log('Successfully applied flex layout fix for badge + chevron');
} else {
    console.log('Could not find the target string');
}
