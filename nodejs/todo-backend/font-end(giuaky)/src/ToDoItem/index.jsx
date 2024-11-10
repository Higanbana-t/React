import React from 'react';
import { format } from 'date-fns';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Radio } from 'antd';

const ToDoItem = ({ id, title, due_date, completed, onDelete, onStatusChange, onEdit }) => {
    const dueDateFormat = format(new Date(due_date), 'dd MMMM yyyy HH:mm');

    const handleStatusChange = (e) => {
        onStatusChange(id, e.target.value);
    };

    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <div className="ToDoItem" style={{ marginBottom: '15px' }}>
            <div className="ItemContent" style={{ display: 'inline-block', marginLeft: '10px' }}>
                <p className="Title" style={{ textDecoration: completed === 'Completed' ? 'line-through' : 'none' }}>
                    {title}
                </p>
                <p className="DueDate">{dueDateFormat}</p>
                <p className="Status">Trạng thái: {completed === 'Completed' ? 'Hoàn thành' : 'Chưa hoàn thành'}</p>
            </div>
            <Radio.Group
                onChange={handleStatusChange}
                value={completed === 'Completed' ? 1 : 0}
                style={{ display: 'inline-block', marginLeft: '15px' }}
            >
                <Radio value={0}>Chưa hoàn thành</Radio>
                <Radio value={1}>Hoàn thành</Radio>
            </Radio.Group>
            <div className="Action" style={{ display: 'inline-block', marginLeft: '15px' }}>
                <EditOutlined onClick={() => onEdit(id)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                <DeleteOutlined onClick={handleDelete} style={{ cursor: 'pointer' }} />
            </div>
        </div>
    );
};

export default ToDoItem;
