import React from 'react';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import './ToDoList.css';
import { useState } from 'react';
const ToDoList = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Học lập trình web với React', dueDate: 'Tomorrow', completed: false ,color: 'red'},
        { id: 2, text: 'Gửi email nộp bài tập về nhà', dueDate: 'Saturday', completed: false },
        { id: 3, text: 'Học từ vựng tiếng anh mỗi ngày', dueDate: 'Monday', completed: false },
        { id: 4, text: 'Viết tiểu luận môn Triết học', dueDate: 'Today', completed: false },
      ]);
      const[newTask, setNewTask] = useState('');
      const [selectedDateStr, setSelectedDateStr] = useState(''); // Lưu ngày chọn từ Flatpickr

  // Khởi tạo Flatpickr
  flatpickr(".flatpickr", {
    dateFormat: "Y-m-d H:i",
    onChange: function (selectedDates, dateStr) {
      const selectedDate = selectedDates[0]; // Lấy ngày đã chọn
      const timeInMilliseconds = selectedDate.getTime(); // Mili-giây của ngày chọn
      setSelectedDateStr(dateStr); // Lưu chuỗi ngày đã chọn
    }
  });

  // Hàm addTask để thêm task mới
  const addTask = () => {
    // Lấy thời gian hiện tại
    const today = new Date();
    const timeToday = today.getTime();

    // Nếu người dùng đã chọn ngày, so sánh khoảng cách thời gian
    if (selectedDateStr) {
      const selectedDate = new Date(selectedDateStr);
      const timeSelected = selectedDate.getTime();

      // Tính toán số ngày chênh lệch
      const daysDifference = Math.round((timeSelected - timeToday) / (1000 * 60 * 60 * 24));

      let displayDate = "";
      let color = "";

      // Kiểm tra số ngày để hiển thị đúng nội dung và màu sắc
      if (daysDifference === 0) {
        displayDate = "Today"; // Hôm nay
        color = "green";
      } else if (daysDifference === 1) {
        displayDate = "Tomorrow"; // Ngày mai
        color = "orange";
      } else if (daysDifference === 2) {
        displayDate = "2 days"; // 2 ngày
        color = "yellow";
      } else {
        displayDate = selectedDate.toLocaleDateString(); // Hiển thị ngày tháng cụ thể
        color = "blue";
      }
      if (newTask === '') {
        alert('Please enter your task');
      }
      else {
        setTasks([...tasks, {
          id: tasks.length + 1,
          text: newTask,
          dueDate: displayDate,
          completed: false,
          color: color // Thêm màu sắc
        }]);
      }
      // Thêm task mới vào danh sách



      // Reset input task
      setNewTask('');
    }
  }
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  return (
    <div >
      <h1>My work 🎯</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => toggleTask(task.id)} 
              style={{ color: task.color }}
            />
            <div >
              <div className=''>{task.text}</div>
              <div  className='dueDate' style={{color:task.color}}>{task.dueDate}</div>
            </div> 

            
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input 
        type="text" 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)} 
        placeholder="Add task"
      />
      
      <input type='text' className="flatpickr" placeholder="Select due date"  id="datePicker" />
      <button onClick={addTask} className='add-button'>Add Task</button>
    </div>
  );

}
export default ToDoList;