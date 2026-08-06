const express = require("express");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares/log");
const connectMongoDb = require("./connections/database");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logReqRes('log.txt'));


// Connection : url to database process and specific collection
connectMongoDb('mongodb://127.0.0.1:27017/youtube-app-1')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started, listening on port ${PORT}...`);
    });
  })
  .catch((err) => console.log('Server initialization falied: ', err));

// routes
app.use('/api/users', userRouter);