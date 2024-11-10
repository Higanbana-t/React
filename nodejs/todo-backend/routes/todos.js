const express = require('express');
const router = express.Router();
const db = require('../database');

// Lấy tất cả các công việc (GET)
router.get('/', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Tạo mới một công việc (POST)
router.post('/', (req, res) => {
    const { title, description, due_date } = req.body;
    db.query('INSERT INTO todos (title, description, due_date) VALUES (?, ?, ?)', [title, description, due_date], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, title, description, due_date, status: 'Chưa hoàn thành' });
    });
});

// Cập nhật công việc theo ID (PUT)
router.put('/:id', (req, res) => {
    const { title, description, due_date, status } = req.body;
    const { id } = req.params;

    // Kiểm tra trạng thái hợp lệ
    if (status !== 'Hoàn thành' && status !== 'Chưa hoàn thành') {
        return res.status(400).send({ message: 'Trạng thái không hợp lệ.' });
    }

    // Cập nhật công việc
    db.query('UPDATE todos SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ?', 
    [title, description, due_date, status, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Todo đã được cập nhật thành công.' });
    });
});

// Xoá công việc theo ID (DELETE)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todos WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Todo đã được xóa thành công.' });
    });
});

// Đặt module.exports ở cuối file để đảm bảo tất cả endpoint được xuất
module.exports = router;
