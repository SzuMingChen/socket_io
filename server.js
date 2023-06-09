const express = require('express');
const cors = require('cors');
const port = 3000;
const app = express();
const { clog, sleep } = require('./utils');

const server = require('http').createServer(app);
app.use(cors());
const io = require('socket.io')(server, {
    cors: {
        origin: "*",//! 允許來源，也可以為網域 "*"為允許所有來源 
        method: ["GET", "POST"],//! 設置只允許這兩種請求方式
        credentials: true //! 可允許攜帶身分憑證 ex:cookie
    }
});

const ip = '127.0.0.1:3123';

//* 伺服器與客戶端連接
io.on('connection', (socket) => {
    clog(`使用者連接, sid=${socket.id}`);

    // 發送 pong 碼給客戶端
    function socket_send_info() {
        socket.emit('pong', ip);
    }

    // 接收客戶端的 cmd(Ping) 
    socket.on('cmd', function (arg) {
        clog(`接收到客戶端 cmd sid=${socket.id} cmd=${arg.cmd}`);
        switch (arg.cmd) {
            case arg.cmd:
                return socket_send_info();
        }
    });

    // 使用者斷開連接
    socket.on('disconnect', () => {
        clog(`使用者斷開連接, sid=${socket.id}`);
    });
});

server.listen(port, () => {
    console.log(`伺服器運行 http://127.0.0.1:${port}`);
});

// 建立服務
// const server = http.createServer(app);
// const io = new socketIO.Server(server, {cors: {
//     origin:"*",
//     method:["GET","POST"],
//     credentials:true
// }});
// io.on('connection', (socket) => {
//     clog(`user connected sid=${socket.id}`);
//     socket_send_info();
//     socket.on('disconnect', function () {
//         clog(`user disconnected sid=${socket.id}`);
//     });
//     socket.on('cmd', async function (arg) {
//         clog(`client cmd sid=${socket.id} cmd=${arg.cmd}`);
//         switch (arg.cmd) {
//         }
//     });
// })


// //* 路徑
// app.get('/', async (req, res) => {
//     // 測試
//     await sleep(5000);
//     res.status(200).send(`${ip}, 請求次數::${req}`);
//     clog(`紀錄伺服器IP時間搓::${ip}, 次數::${req}`);
// })


// //* 啟動
// app.listen(port, () => {
//     console.log(`http://127.0.0.1:${port}`);
// });


