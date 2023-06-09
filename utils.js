
// 紀錄時間搓
exports.clog = (msg) => {
    console.log(new Date().toLocaleString() + ':: ' + msg);
};

// 延遲設定
exports.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};