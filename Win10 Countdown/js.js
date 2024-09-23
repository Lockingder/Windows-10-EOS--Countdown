let countdown;

document.getElementById("startButton").addEventListener("click", function() {
    const selectedDate = new Date(document.getElementById("inputDate").value);
    
    if (!selectedDate.getTime() || selectedDate <= new Date()) {
        alert("請選擇一個未來的日期！");
        return;
    }

    // 儲存選擇的未來日期到 localStorage
    localStorage.setItem("endDate", selectedDate);

    clearInterval(countdown);
    startCountdown(selectedDate);
});

// 在頁面加載時檢查是否有正在倒數的狀態
window.onload = function() {
    const endDate = localStorage.getItem("endDate");
    if (endDate) {
        startCountdown(new Date(endDate));
    }
};

function startCountdown(endDate) {
    countdown = setInterval(() => {
        const now = new Date();
        const timeDifference = endDate - now;

        if (timeDifference <= 0) {
            clearInterval(countdown);
            document.getElementById("timer").textContent = "時間到！";
            localStorage.removeItem("endDate"); // 清除 localStorage
            return;
        }
        
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        document.getElementById("timer").textContent = `${days}天 ${hours}小時 ${minutes}分 ${seconds}秒`;
    }, 1000);
}

// 重置按鈕
document.getElementById("resetButton").addEventListener("click", function() {
    clearInterval(countdown);
    localStorage.removeItem("endDate");
    document.getElementById("timer").textContent = "00天 00小時 00分 00秒";
    document.getElementById("inputDate").value = "";
});
