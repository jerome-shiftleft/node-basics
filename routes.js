const fs = require("fs");

const requestHandler = (req, res) => {

  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write(`
      <body>
        <form action="/message" method="POST">
          <input type="text" name="message">
          <button type="submit">Send</button
          </form>
      </body>
    `);
    res.write("</html>");
    return res.end();
  } // end of if (url === "/")

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      //console.log(parseBody);
      const message = parseBody.split("=")[1];

      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      }); // end of fs.writeFile
    }); // end of return req.on("end", () => {
  } // end of if (url === "/message" && method === "POST")

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server</h1></body>");
  res.write("</html>");
  res.end();

}; // end of const requestHandler = ()

// module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   someText: 'some hard coded text'
// }

// module.exports.handler = requestHandler;
// module.exports.someText = "some hard coded text";

exports.handler = requestHandler;
exports.someText = "some hard coded text";