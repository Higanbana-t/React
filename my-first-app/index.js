const express = require('express');
const app = express();  // Khởi tạo `app`
const todosRouter = require('./routes/todos'); // Import router

app.use(express.json());  // Middleware để parse JSON
app.use('/todos', todosRouter);  // Kết nối todosRouter với đường dẫn `/todos`

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
