// Importa o modulo do node http
const http = require("http");

// importa modulo interno feito por mim routes
const routes = require("./routes");

// cria o servidor que recebe request e envia responses
const server = http.createServer(routes.requestHabdler);

// Coloca o servidor para ficar na porta 3000 do computador
server.listen(3000);