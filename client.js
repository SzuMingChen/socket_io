const ping = require('ping');
const { clog } = require('./utils');
const { io } = require('socket.io-client');
const socket = io('http://127.0.0.1:3000');
const client = '192.168.85.173'

//* 需求::客戶端發送ping碼至伺服器端，伺服器端接收到ping碼後才回傳(被動式);

socket.on('connect', () => {
    // 程式執行
    clog('與伺服器端連線成功');
    // 發送 Ping 碼並記錄
    function sendPing(host) {
        ping.sys.probe(host, (isAlive) => {
            const status = isAlive ? 200 : 404;
            clog(`客戶端:${host} 狀態碼:${status}`);
        });
    }
    // 每秒發送到伺服器端
    setInterval(() => socket.emit('cmd', { cmd: client }, sendPing(client)), 1000);
});

// 接收伺服器端的回應
socket.on('pong', (response) => {
    clog(`伺服器回應: ${response}`);
});


// const axios = require('axios');
// const { clog } = require('./utils');


// clog(`程式執行`);

// function fetchIP(url) {
//     let count= 1;
//     const intervalId = setInterval(() => {
//         clog(`axios傳送 ${count}`);
//         axios.get(url, { params:{ count:count } })
//             .then(response => {
//                 clog(`伺服器訊息::${response.data}, 請求狀態碼::${response.status}`);
//             })
//             .catch(error => {
//                 clog(`伺服器錯誤回應::${error}`);
//             });
//         count++;
//         if (count > 5) {
//             clearInterval(intervalId); //到達設定目標停止
//         }
//     }, 1000);
// }


// fetchIP('http://127.0.0.1:3000');

// setInterval(() => fetchIP('http://127.0.0.1:3000'), 10000);

