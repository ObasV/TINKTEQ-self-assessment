const http = require('http')
const app = require('./src/app');
const {connectDB} = require('./src/db/connectDB');
require('dotenv').config();

const PORT = process.PORT || 5050;

const server = http.createServer(app);

async function startServer(){
    await connectDB();
    server.listen(PORT, () => {
        console.info(`server running on port http://localhost:${PORT}`);
    });

}

startServer();