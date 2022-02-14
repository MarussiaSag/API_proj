require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");
const indexRouter = require("./routes/indexRouter");
const { check } = require("./middleware/middleware");

const app = express();
const PORT = 3000;

// Start server settings
app.set("view engine", "hbs");
// End server settings

// Start middleware section
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    store: new FileStore({}), // chmod -R 777 sessions
    secret: process.env.SECRET ?? "qwerty",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
    name: "auth",
  })
);

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/", check, indexRouter);

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});
