const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai'); // Thay thế thư viện Google bằng OpenAI
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

//Setting của gemini
const API_KEY = process.env.GEMINI_API_KEY; // MÃ hóa thằng render.com là thằng giữ API key nó sẽ tìm đúng biến này rồi thay thế bằng api key của mình vào
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // phải là 2.5 mới chạy ko hiểu sao 1.5 ko chạy dc =))

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        console.log("📩 Nhận câu hỏi:", userMessage);

        // Gọi API DeepSeek
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: userMessage }],
            model: "gpt-3o-mini", // Model chat (V3), hoặc dùng "deepseek-coder" nếu code
        });

        // Lấy nội dung trả về (cấu trúc khác Gemini một chút)
        const text = completion.choices[0].message.content;

        console.log("🤖 Đã trả lời xong.");
        res.json({ reply: text });

    } catch (error) {
        console.error("❌ Lỗi:", error);
        res.status(500).json({ reply: "Server DeepSeek đang bận hoặc hết tiền, thử lại sau nhé!" });
    }
});

// Các route tĩnh giữ nguyên
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'chatbot.html'));
});

app.get('/chatbot.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'chatbot.js'));
});

app.listen(port, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${port}`);
});