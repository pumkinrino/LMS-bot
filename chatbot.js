/* Bắt đầu bằng dấu chấm phẩy để ngắt các script trước đó */
;(function() {
    'use strict';
    
    // Hàm khởi tạo chính
    function initChatbot() {
        console.log("🚀 Chatbot đang khởi động...");
        
        // CẤU HÌNH LINK RENDER
        var CHAT_URL = "https://lms-bot-441o.onrender.com"; 

        // Kiểm tra xem nút đã có chưa để tránh trùng lặp
        if (document.getElementById("chatbot-trigger-btn")) return;

        // 1. Tạo nút tròn
        var btn = document.createElement("button");
        btn.id = "chatbot-trigger-btn";
        btn.innerHTML = "💬";
        btn.style.cssText = "position:fixed; bottom:20px; right:20px; width:60px; height:60px; border-radius:50%; background:#007bff; color:white; font-size:30px; border:none; cursor:pointer; z-index:2147483647; box-shadow:0 4px 12px rgba(0,0,0,0.3); transition: transform 0.3s;";
        
        // 2. Tạo khung Chat
        var box = document.createElement("div");
        box.id = "chat-frame-box";
        box.style.cssText = "position:fixed; bottom:90px; right:20px; width:350px; height:500px; background:white; z-index:2147483647; display:none; border-radius:12px; box-shadow:0 5px 20px rgba(0,0,0,0.2); overflow:hidden; border:1px solid #ddd;";
        
        var iframe = document.createElement("iframe");
        iframe.src = CHAT_URL;
        iframe.style.cssText = "width:100%; height:100%; border:none;";
        box.appendChild(iframe);

        // 3. Gắn vào trang
        document.body.appendChild(btn);
        document.body.appendChild(box);

        // 4. Sự kiện bấm nút
        btn.onclick = function() {
            if (box.style.display === "none") {
                box.style.display = "block";
                btn.innerHTML = "❌";
                btn.style.transform = "rotate(90deg)";
            } else {
                box.style.display = "none";
                btn.innerHTML = "💬";
                btn.style.transform = "rotate(0deg)";
            }
        };
    }

    // CHỜ TRANG WEB TẢI XONG MỚI CHẠY (Khắc phục lỗi e.map/RequireJS)
    if (document.readyState === 'complete') {
        initChatbot();
    } else {
        window.addEventListener('load', initChatbot);
    }
})();