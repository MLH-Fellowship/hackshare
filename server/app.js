const express = require("express");
const userRoute = require("./Routes/user");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const app = express();

require("dotenv").config();

app.use("/user", userRoute);

app.use(
  jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    algorithms: ["RS256"],
  })
);
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(8000);
