import React, { useState, useEffect } from 'react';
import { Modal, Input, DatePicker, Select, Button, Table, Popconfirm, Radio, Typography } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';

const { Option } = Select;
const { Title } = Typography;

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newDueDate, setNewDueDate] = useState(null);
    const [newStatus, setNewStatus] = useState('Pending');

    useEffect(() => {
        axios.get('http://localhost:3001/todos')
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => console.error("Lỗi khi tải dữ liệu:", error));
    }, []);

    const addTodo = () => {
        const newTodo = {
            title: newTitle,
            due_date: dayjs(newDueDate).format('YYYY-MM-DD HH:mm'),
            completed: newStatus === 'Completed' ? 1 : 0,
        };
    
        axios.post('http://localhost:3001/todos', newTodo)
            .then(response => {
                // Thêm công việc vào state
                setTodos([...todos, response.data]);
                resetModalFields();
            })
            .catch(error => console.error("Lỗi khi thêm dữ liệu:", error));
    };
    

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:3001/todos/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch(error => console.error("Lỗi khi xóa dữ liệu:", error));
    };

    const updateTodo = (id, updatedData) => {
        return axios.put(`http://localhost:3001/todos/${id}`, updatedData)
            .then(() => {
                setTodos(todos.map(todo =>
                    todo.id === id ? { ...todo, ...updatedData } : todo
                ));
            })
            .catch(error => console.error("Lỗi khi cập nhật dữ liệu:", error));
    };
    
    

    const handleStatusChange = (id, newStatus) => {
        // Cập nhật trạng thái trong state
        const updatedData = { completed: newStatus === 'Completed' ? 1 : 0 };
    
        // Cập nhật trạng thái task trên server
        updateTodo(id, updatedData).then(() => {
            setTodos(todos.map(todo =>
                todo.id === id ? { ...todo, ...updatedData } : todo
            ));
        });
    };
    

    const resetModalFields = () => {
        setNewTitle('');
        setNewDueDate(null);
        setNewStatus('Pending');
        setIsEditMode(false);
        setIsModalOpen(false);
        setCurrentEditId(null);
    };

    const showAddModal = () => {
        resetModalFields();
        setIsModalOpen(true);
    };

    const showEditModal = (id) => {
        const todo = todos.find((item) => item.id === id);
        setNewTitle(todo.title);
        setNewDueDate(dayjs(todo.due_date));
        setNewStatus(todo.completed ? 'Completed' : 'Pending');
        setIsEditMode(true);
        setCurrentEditId(id);
        setIsModalOpen(true);
    };

    const handleModalOk = () => {
        if (isEditMode) {
            // Chỉnh sửa task
            updateTodo(currentEditId, {
                title: newTitle,
                due_date: dayjs(newDueDate).format('YYYY-MM-DD HH:mm'),
                
            }).then(() => {
                // Sau khi cập nhật xong, reset modal và đóng modal
                resetModalFields();
            });
         
        }
    };
    
    
    

    const handleModalCancel = () => {
        resetModalFields();
    };

    // Cập nhật cột bảng để thêm ô radio duy nhất và trạng thái dạng văn bản
    const columns = [
        {
            title: 'Hoàn thành',
            key: 'completed',
            render: (text, record) => (
                <Radio
                    checked={record.completed === 1}
                    onChange={() => handleStatusChange(record.id, record.completed === 1 ? 'Pending' : 'Completed')}
                />
            ),
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Ngày đến hạn',
            dataIndex: 'due_date',
            key: 'due_date',
            render: (text) => dayjs(text).format('DD MMMM YYYY HH:mm'),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'completed',
            key: 'status',
            render: (completed) => (completed === 1 ? 'Hoàn thành' : 'Chưa hoàn thành'),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <>
                    <EditOutlined onClick={() => showEditModal(record.id)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa task này không?"
                        onConfirm={() => deleteTodo(record.id)}
                    >
                        <DeleteOutlined style={{ cursor: 'pointer' }} />
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div className="ToDoList" style={{ marginLeft: '10px' }}>
            <Title level={2}>My Work 🎯</Title>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={todos}
                pagination={false}
                bordered
            />
            <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                size="large"
                style={{ marginTop: '20px' }}
                onClick={showAddModal}
            >
                Add Task
            </Button>

            <Modal
                title={isEditMode ? "Chỉnh Sửa Task" : "Thêm Task Mới"}
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                width={400}
            >
                <Input
                    placeholder="Tiêu đề task"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                <DatePicker
                    placeholder="Chọn ngày đến hạn"
                    showTime
                    value={newDueDate}
                    onChange={(date) => setNewDueDate(date)}
                    style={{ width: '100%', marginBottom: '10px' }}
                />

 
            </Modal>
        </div>
    );
};

export default ToDoList;
