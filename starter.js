(function() {
    console.log("Đang gọi Chatbot từ Render...");
    var timeStamp = new Date().getTime(); 
    var script = document.createElement('script');    
    script.src = "https://lms-bot-441o.onrender.com/chatbot.js?t=" + timeStamp;
    script.async = true;
    
    document.head.appendChild(script);
})();