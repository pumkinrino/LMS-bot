const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const port = 3000;

//been thứ 3 gọi được
app.use(cors());
app.use(bodyParser.json());

//Setting của gemini
const API_KEY = "AIzaSyAl8UTiXCFzLdalrTUHuVa6ZDyndL8nIFc"; // Key của bạn
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//API nhận tin nhắn từ người dùng
app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        console.log("📩 Nhận câu hỏi:", userMessage);

        // gemini tả lời
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();

        console.log("🤖 Đã trả lời xong.");
        res.json({ reply: text });

    } catch (error) {
        console.error("❌ Lỗi:", error);
        res.status(500).json({ reply: "Server đang bận, thử lại sau nhé!" });
    }
});
//Khởi động server chạy tại cổng 3000 (sửa ở trên cùng)
app.listen(port, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${port}`);
});
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'chatbot.html'));
});