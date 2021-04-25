/**
 * original created by FaizBastomi and ZefianAlfian
 * don't remove this!!
 */

const fetch = require('node-fetch');
const fs = require('fs');
const { createCanvas, loadImage, registerFont } = require('canvas');

async function randomImg() {
    let res = await fetch('https://source.unsplash.com/460x460/?nature,forest,naturally');
    let buffer = await res.buffer();
    return buffer;
}

async function createQuote(author, text) {
    const canvas = createCanvas(460, 460);
    const ctx = canvas.getContext('2d');

    let gambar = await randomImg();
    gambar = await loadImage(gambar);

    // Fonts
    registerFont('../assets/fonts/bimini-condensed.ttf', { family: 'bimini' });
    registerFont('../assets/fonts/Goldfinger_Kingdom.ttf', { family: 'goldfinger' });

    // Draw Image
    ctx.drawImage(gambar, 0, 0, canvas.width, canvas.height);

    // Fix Text
    let fixed = text.split('');
    const splited = [];
    while (fixed.length) splited.push(fixed.splice(0, 50).join(''));

    fixed = '';
    splited.map(v => fixed += v + '\n');

    // Black Transparent
    ctx.globalAlpha = '0.5';
    ctx.fillStyle = 'Black';
    ctx.fillRect(0, 310, canvas.width, canvas.height - 310);

    // Text
    ctx.globalAlpha = 1;
    ctx.font = '25px bimini';
    ctx.fillStyle = 'White';
    ctx.fillText(fixed, 20, 340);

    // Author
    ctx.font = '25px goldfinger';
    ctx.fillStyle = 'White';
    ctx.fillText(author, 20, 440);

    // Watermark
    ctx.globalAlpha = '0.7';
    ctx.font = '20px goldfinger';
    ctx.fillStyle = 'White';
    ctx.fillText('Made with Canvas', 320, 455);

    return canvas.toBuffer('image/png');
}

createQuote('Faiz', 'Example quote the day.').then((res) => {
    fs.promises.writeFile('../result/quote.png', res);
});
