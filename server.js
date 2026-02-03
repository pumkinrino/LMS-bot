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
const API_KEY = process.env.GEMINI_API_KEY; // MÃ hóa thằng render.com là thằng giữ API key nó sẽ tìm đúng biến này rồi thay thế bằng api key của mình vào
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // phải là 2.5 mới chạy ko hiểu sao 1.5 ko chạy dc =))

//API nhận tin nhắn từ người dùng chỉ nhận đường dẫn /chat
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
// gọi phát là trả về view chatbot.html
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'chatbot.html'));
});
//Khởi động server chạy tại cổng 3000 (sửa ở trên cùng)
app.listen(port, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${port}`);
});
