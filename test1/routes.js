exports.handle = (req, res) => {
  const url = req.url;
  const method = req.method;

	// console.log(url, method);

  if (url === "/" && method === "GET") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Hello World</title></head>");
    res.write('<body><form action="/create-user" method="POST"><input type="text" name="user"/><button type="submit">Send</button></form></body>');
    res.write("</html>");
    return res.end();
  }

  if (url === "/users" && method == "GET") {
		res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Users</title></head>");
    res.write("<body><ul><li>User 1</li> <li>User 2</li> <li>User 3</li></ul></body>");
    res.write("</html>");
    return res.end();
  }

	if (url === "/create-user" && method === "POST") {
		const body = [];
		req.on('data', (chunck) => {
			body.push(chunck);
		});
		return req.on('end', () => {
			const data = Buffer.concat(body).toString();
			const user = data.split('=')[1];
			console.log(user);

			res.statusCode = 302;
			res.setHeader('Location', '/');
			return res.end();
		});
	}
};
