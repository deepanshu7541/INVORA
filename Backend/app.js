require("dotenv").config();
require("express-async-errors");

const connectDB = require("./db/connect");
const express = require("express");
const cors = require("cors");
const app = express();
const mainRouter = require("./routes/user");
const authMiddleware = require('./middleware/auth')

app.use(express.json());
app.use(cors());
app.use("/api/v1", mainRouter);

// Middleware to count requests (DDos attack simulation)
let totalRequestCount = 0;

app.use((req, res, next) => {
  totalRequestCount++;
  console.log(`Request #${totalRequestCount}`);

  if (totalRequestCount > 10) {
    console.log('Too many requests. Simulating DDos attack...');
    res.status(429).send('Too many requests. Please try again later.');
    process.exit(1);
  } else {
    next();
  }
});

app.use("/api/v1", mainRouter); // your route



const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = app; // Export for testing
if (process.env.NODE_ENV !== "test") {
  start();
}

// require("dotenv").config();
// require('express-async-errors');

// const connectDB = require("./db/connect");
// const express = require("express");
// const cors = require('cors');
// const mainRouter = require("./routes/user");

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use("/api/v1", mainRouter);

// const port = process.env.PORT || 3000;

// if (process.env.NODE_ENV !== "test") {  // ✅ Prevent server from starting in test mode
//   const start = async () => {
//     try {        
//       await connectDB(process.env.MONGO_URI);
//       app.listen(port, () => {
//         console.log(`Server is listening on port ${port}`);
//       });
//     } catch (error) {
//       console.log(error); 
//     }
//   };
//   start();
// }

// module.exports = app; 

// // require("dotenv").config();
// // require('express-async-errors');

// // const connectDB = require("./db/connect");
// // const express = require("express");
// // const cors = require('cors')
// // const app = express();
// // const mainRouter = require("./routes/user");

// // app.use(express.json());

// // app.use(cors())
// // app.use("/api/v1", mainRouter);

// // const port = process.env.PORT || 3000;

// // const start = async () => {

// //     try {        
// //         await connectDB(process.env.MONGO_URI);
// //         app.listen(port, () => {
// //             console.log(`Server is listening on port ${port}`);
// //         })

// //     } catch (error) {
// //        console.log(error); 
// //     }
// // }

// // start();