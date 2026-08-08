const fs = require('fs');
let content = fs.readFileSync('src/components/finance/MyCards.tsx', 'utf8');

content = content.replace(/<div className="swiper swiper-fade swiper-initialized swiper-horizontal swiper-watch-progress swiper-backface-hidden">/g, '<div>');
content = content.replace(/<div className="swiper-wrapper">/g, '<div className="flex flex-col gap-4">');

// Replace the first slide
content = content.replace(/<div className="swiper-slide swiper-slide-visible swiper-slide-fully-visible swiper-slide-active" style=\{\{"width":"246px","opacity":"1","transform":"translate3d\(0px, 0px, 0px\)"\}\}>/, '<div className="w-full">');

let nextSlideIndex = content.indexOf('<div className="swiper-slide swiper-slide-next"');
let swiperEndIndex = content.indexOf('<div className="flex items-center justify-between border-b'); 

if (nextSlideIndex !== -1 && swiperEndIndex !== -1) {
    content = content.substring(0, nextSlideIndex) + '</div></div>' + content.substring(swiperEndIndex);
}

fs.writeFileSync('src/components/finance/MyCards.tsx', content);
console.log('Fixed MyCards.tsx');
