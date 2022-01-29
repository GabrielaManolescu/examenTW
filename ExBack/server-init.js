import express from "express";
import cors from "cors";
import dotenv from "dotenv";

if (process.env.NODE_ENV != 'PRODUCTION') dotenv.config();

const server = express();
const router = express.Router();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

server.use("/api", router);

// const port = process.env.PORT || 8000;
// server.listen(port, function afterServerStart() {
//     console.log(`Server is running on port ${port}...`);
// });



server.listen(process.env.PORT, function afterServerStart() {
    console.log(`Server is running on port ${process.env.PORT}..`);
});

export { server, router };