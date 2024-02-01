require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const SocketServer = require("./socketServer");
const { ExpressPeerServer } = require("peer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
if (process.env.NODE_ENV === "production") {
  // Allow requests from your Netlify frontend domain
  app.use(
    cors({
      origin: ["https://sm-network-mern-social-ma.vercel.app/"],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true, // Allow credentials such as cookies
    })
  );

  // Serve static files from the build folder
  app.use(express.static("FrontEnd/build", { maxAge: "1d" }));

  // Handle routes for your frontend app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "FrontEnd", "build", "index.html"));
  });
} else {
  // In development mode, you might want to enable CORS for local testing
  app.use(cors());
}
// Socket
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  SocketServer(socket);
});

// Create peer server
ExpressPeerServer(http, { path: "/" });

// Routes
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/userRouter"));
app.use("/api", require("./routes/postRouter"));
app.use("/api", require("./routes/commentRouter"));
app.use("/api", require("./routes/notifyRouter"));
app.use("/api", require("./routes/messageRouter"));
app.get("/", (req, res) => {
  res.send("Welcome to Mern Stack  Vnetwork");
});

const port = process.env.PORT || 8000;

mongoose
  .connect(
    "mongodb://sufi0900:sufi0900@ac-s3hligl-shard-00-00.miah2mi.mongodb.net:27017,ac-s3hligl-shard-00-01.miah2mi.mongodb.net:27017,ac-s3hligl-shard-00-02.miah2mi.mongodb.net:27017/Vnetwork?ssl=true&replicaSet=atlas-397tbw-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
