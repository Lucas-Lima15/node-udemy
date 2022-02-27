// importa modulo interno fs que permite manipular arquivos e etc
const fs = require("fs");

// funcao que vai usada para simular a rota, ela recebe req (request) e res (response) como argumentos e exporta tambem
exports.requestHabdler = (req, res) => {
    // Pega do objeto req (request) a propriedade url que repesenta a url
    const url = req.url;
    // Pega do objeto req (request) a propriedade o metodo, se é get ou post ou etc
    const method = req.method;

    // Verifica aqui se a url é igual a '/' e o método enviado pelo front é GET, caso seja entra nesse if
    if (url === "/" && method === "GET") {
        // Acresenta no header que aceita o content-type text/html para enviar um HTML
        res.setHeader("Content-Type", "text/html");
        // Começa a escrever a res com res.write
        res.write("<html>");
        res.write("<head><title>My firt Page</title></head>");
        // Cria um form que envia o subimit para o url '/message' com post e data message
        res.write(
          '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
        );
        res.write("</html>");
        // Envia a response
        return res.end();
      }
      // Verifica se na URL é '/message' e o method é POST
      if (url === "/message" && method === "POST") {
        // Cria o array onde vai ficar o body com o data do request
        const body = [];
        // Cria um evento. Se recebeu data do front executa a callback recebendo como parametro o chunk que representa o data porem precisa ser convertido ainda
        req.on("data", (chunk) => {
          // Coloca o chunk no array body que está no escopo onde o server esta rodando
          body.push(chunk);
        });
        // Cria outro evento. Que é executado quando termina o último evento, perceba que ele é retornado, isso para que o node não o coloque para executar depois  
        // e sim imediatamente
        return req.on("end", () => {
          // Ele pega o formato 'stream' que o body está e com o Buffer.concat(body) 'traduz' para uma linguagem que podemos entender
          const parseBody = Buffer.concat(body).toString();
          // Aqui ele separou a string de cima e pegou o ultimo array que é o data message
          const message = parseBody.split("=")[1];
          // Usa a função do módulo fs, para criar/modificar arquivo message.txt, colocar a message que foi escrita no input, recebe uma callback com argumento err
          // Que seria se houvesse erro. Mas não é tratado, essa callback é sempre executada
          fs.writeFile("message.txt", message, () => {
            // Modificado o status code da resposta para 302, que significa redirecionamento
            res.statusCode = 302;
            // Redireciona para para url '/' atravez da header Location
            res.setHeader("Location", "/");
            // Acaba a response e envia
            return res.end();
          });
        });
      }
    
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<head><title>My firt Page</title></head>");
      res.write("<body><h1>Hello World</h1></body>");
      res.write("</html>");
      res.end();
};

// module.exports =requestHabdler;