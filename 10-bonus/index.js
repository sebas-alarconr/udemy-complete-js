const fs = require('fs');
const http = require('http');
const url = require('url');

const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = url.parse(req.url, true).pathname;
  const id = url.parse(req.url, true).query.id;

  if (pathName === '/products' || pathName === '') {
    res.writeHead(200, '', {'Content-Type': 'text/html'});

    fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
      fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, cardData) => {
        const cardsOutput = laptopData.map(item => replaceTemplate(cardData, item)).join('');
        res.end(data.replace('{%CARDS%}', cardsOutput));
      });
    });
  } else if (pathName === '/laptop' && id < laptopData.length) {
    res.writeHead(200, '', {'Content-Type': 'text/html'});
    fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
      const laptop = laptopData[id];
      res.end(replaceTemplate(data, laptop));
    });
  } else if ((/\.(jpg|png|jpeg|gif)$/i).test(pathName)) {
    fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
      if (err) {
        res.writeHead(400, 'image not found');
        res.end('image not found');
      };
      res.writeHead(200, '', {'Content-Type': 'image/jpg'});
      res.end(data);
    });
  } else {
    res.writeHead(404, '', {'Content-Type': 'text/html'});
    res.end('URL NOT FOUND');
  }
});

server.listen(1337, '127.0.0.1', () => {
  console.log('Server listening');
});

function replaceTemplate(originalHtml, laptop) {
  return originalHtml
    .replace(/{%PRODUCTNAME%}/g, laptop.productName)
    .replace(/{%IMAGE%}/g, laptop.image)
    .replace(/{%PRICE%}/g, laptop.price)
    .replace(/{%SCREEN%}/g, laptop.screen)
    .replace(/{%CPU%}/g, laptop.cpu)
    .replace(/{%STORAGE%}/g, laptop.storage)
    .replace(/{%RAM%}/g, laptop.ram)
    .replace(/{%DESCRIPTION%}/g, laptop.description)
    .replace(/{%ID%}/g, laptop.id);
}