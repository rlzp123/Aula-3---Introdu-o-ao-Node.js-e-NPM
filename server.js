const http = require('http');
const fs = require('fs');
const path = require('path');
const colors = require('colors');

const ingressos = [
  { id: 1, assento: "A1", status: "disponível" },
  { id: 2, assento: "A2", status: "indisponível" },
  { id: 3, assento: "B1", status: "disponível" }
];

const server = http.createServer((req, res) => {
  console.log(`Requisição: ${req.url}`.green);

  // API
  if (req.url === "/api/ingressos") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(ingressos));
  }

  // Arquivos estáticos
  let filePath = req.url === "/"
    ? path.join(__dirname, "public", "index.html")
    : path.join(__dirname, "public", req.url);

  const ext = path.extname(filePath);

  const contentTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg"
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      const path404 = path.join(__dirname, "public", "404.html");
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(fs.existsSync(path404) ? fs.readFileSync(path404) : "404");
    }

    res.writeHead(200, {
      "Content-Type": contentTypes[ext] || "text/plain"
    });
    res.end(content);
  });
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000".green.bold);
});