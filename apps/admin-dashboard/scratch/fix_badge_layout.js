const fs = require('fs');

let c = fs.readFileSync('src/layout/AppSidebar.tsx', 'utf8');

const targetBlock = `              {(isExpanded || isHovered || isMobileOpen) && (
                <>
                  <span className={\`menu-item-text\`}>{nav.name}</span>
                  {(nav.new || nav.pro) && (
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

const newBlock = `              {(isExpanded || isHovered || isMobileOpen) && (
                <>
                  <span className={\`menu-item-text\`}>{nav.name}</span>
                  
                  <div className="ml-auto flex items-center gap-2">
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

if (c.includes(targetBlock)) {
    c = c.replace(targetBlock, newBlock);
    fs.writeFileSync('src/layout/AppSidebar.tsx', c);
    console.log('Successfully replaced sidebar layout structure.');
} else {
    console.log('Target block not found. Checking variations...');
}
