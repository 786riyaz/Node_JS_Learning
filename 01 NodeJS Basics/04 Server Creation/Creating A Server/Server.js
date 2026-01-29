/* URL for node js about page
https://nodejs.org/en/about
*/

const http = require('node:http');          // importing a module in the program which support HTTP comms
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
//   res.end('Hello World !!!');
  res.end(`<!DOCTYPE html>
  <html lang="en">
  <!-- Head   Lorem   Strong  Bold   Italic  Image   Anchor  emphasized  horihontal-ruler -->
  <!-- This is Comment On HEAD tag-->
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Practice 1 - RK</title>
      <!-- this is external link to css file-->
      <link rel="stylesheet" href="test.css">
      <!-- this is including a javascript file -->
      <script src="test.js"></script>
  </head>
  
  <!-- This is Comment On BODY tag-->
  
  <body>
      <div>
          This is the content in HTML Body
      </div>
      <BR>
      <div>
          Second Line
      </div>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, reprehenderit! Nemo hic reprehenderit,
          similique consequatur earum non asperiores molestiae nihil consectetur est saepe eum iure sint magnam odio ipsam
          accusantium soluta, at dolore eveniet praesentium quae. Recusandae beatae dignissimos corrupti.</p>
  
      <hr>
      <b>Bold</b>
      <i>Italic</i>
      <em>Emphasized</em><br>
      <strong>Strong</strong>
      <a href="https://google.com" target="blank">Google Link</a>
      <br>
      <a href="/MyGit/test2.html" target="blank">Link of Document</a>
      <br>
      <img src="test.jpg" alt="Image from folder"><br>
      <img src="https://source.unsplash.com/600x400/?nature,water" alt="Image from splash source/remote image">
  </body>
  
  </html>`);
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

