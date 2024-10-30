const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',  //host của CSDL (Nếu sử dụng local sẽ là localhost, nếu sử dụng VPS/Máy chủ khác thì sẽ dùng địa chỉ IP
    user: 'root',  //tên tài khoản kết nối đến CSDL
    password: 'binganhoa', // Mật khẩu
    database: 'todolist_app' // Tên cơ sở dữ liệu đã tạo ở bước trước
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = db;
