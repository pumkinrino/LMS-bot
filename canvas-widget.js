(function() {
    console.log("Chatbot Widget Starting...");

    // CẤU HÌNH: Dán link Render của bạn vào đây (KHÔNG có đuôi /chat)
    const CHAT_URL = "https://lms-bot-441o.onrender.com/"; 

    // 1. Tạo nút tròn (Icon Chat)
    const btn = document.createElement("button");
    btn.innerHTML = "💬"; // Hoặc icon SVG
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.width = "60px";
    btn.style.height = "60px";
    btn.style.borderRadius = "50%";
    btn.style.backgroundColor = "#007bff";
    btn.style.color = "white";
    btn.style.fontSize = "30px";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.zIndex = "9999";
    btn.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
    document.body.appendChild(btn);

    // 2. Tạo khung Chat (Iframe) - Mặc định ẩn
    const iframe = document.createElement("iframe");
    iframe.src = CHAT_URL;
    iframe.style.position = "fixed";
    iframe.style.bottom = "90px"; // Nằm trên nút một chút
    iframe.style.right = "20px";
    iframe.style.width = "350px";
    iframe.style.height = "500px";
    iframe.style.border = "1px solid #ccc";
    iframe.style.borderRadius = "10px";
    iframe.style.backgroundColor = "white";
    iframe.style.zIndex = "9999";
    iframe.style.display = "none"; // Ẩn đi ban đầu
    iframe.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    document.body.appendChild(iframe);

    // 3. Sự kiện bấm nút để Bật/Tắt
    btn.onclick = function() {
        if (iframe.style.display === "none") {
            iframe.style.display = "block";
            btn.innerHTML = "❌"; // Đổi icon thành nút đóng
        } else {
            iframe.style.display = "none";
            btn.innerHTML = "💬"; // Đổi lại icon chat
        }
    };
})();