const fs = require('fs');
let html = fs.readFileSync('scratch/billing_main.html', 'utf8');

// Basic replacements
let jsx = html.replace(/class=/g, 'className=')
              .replace(/fill-rule=/g, 'fillRule=')
              .replace(/clip-rule=/g, 'clipRule=')
              .replace(/stroke-width=/g, 'strokeWidth=')
              .replace(/stroke-linecap=/g, 'strokeLinecap=')
              .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
              .replace(/stroke-dasharray=/g, 'strokeDasharray=')
              .replace(/stroke-dashoffset=/g, 'strokeDashoffset=')
              .replace(/stroke-opacity=/g, 'strokeOpacity=')
              .replace(/fill-opacity=/g, 'fillOpacity=')
              .replace(/clip-path=/g, 'clipPath=')
              .replace(/for=/g, 'htmlFor=')
              .replace(/<!--.*?-->/gs, '');

// Self-closing tags
jsx = jsx.replace(/<input([^>]+)>/g, (m, attrs) => {
    if (attrs.endsWith('/')) return m;
    return `<input${attrs}/>`;
});
jsx = jsx.replace(/<img([^>]+)>/g, (m, attrs) => {
    if (attrs.endsWith('/')) return m;
    return `<img${attrs}/>`;
});
jsx = jsx.replace(/<circle([^>]+)>/g, (m, attrs) => {
    if (attrs.endsWith('/')) return m;
    return `<circle${attrs}/>`;
});
jsx = jsx.replace(/<rect([^>]+)>/g, (m, attrs) => {
    if (attrs.endsWith('/')) return m;
    return `<rect${attrs}/>`;
});

// Style attributes
jsx = jsx.replace(/style="([^"]*)"/g, (match, styles) => {
    const styleObj = {};
    styles.split(';').forEach(s => {
        if (!s.trim()) return;
        let [key, ...values] = s.split(':');
        let value = values.join(':').trim();
        if (!key || !value) return;
        key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        styleObj[key] = value;
    });
    return `style={${JSON.stringify(styleObj)}}`;
});

// x-text to React variables
jsx = jsx.replace(/x-text="([^"]+)"/g, '');

fs.writeFileSync('scratch/billing_main.jsx', jsx);
console.log('Wrote to scratch/billing_main.jsx');
