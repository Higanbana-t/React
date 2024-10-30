// Lớp SinhVien để tạo đối tượng sinh viên
class SinhVien {
    constructor(id, name, gender, dob, hometown) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.dob = dob;
        this.hometown = hometown;
    }
}

// Lớp QuanLySinhVien để quản lý danh sách sinh viên
class QuanLySinhVien {
    constructor() {
        // Lấy dữ liệu sinh viên từ localStorage hoặc khởi tạo mảng rỗng nếu không có
        this.students = JSON.parse(localStorage.getItem('students')) || [];
        this.displayStudents();
    }

    // Hiển thị danh sách sinh viên lên bảng
    displayStudents() {
        const tableBody = document.getElementById('studentList');
        tableBody.innerHTML = '';
        this.students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.gender}</td>
                <td>${student.dob}</td>
                <td>${student.hometown}</td>
                <td>
                    <button onclick="studentManager.editStudent(${index})">Sửa</button>
                    <button onclick="studentManager.deleteStudent(${index})">Xóa</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Thêm sinh viên mới vào danh sách và lưu trữ
    addStudent(student) {
        this.students.push(student);
        this.saveData();
        this.displayStudents();
    }

    // Xóa sinh viên khỏi danh sách
    deleteStudent(index) {
        if (confirm('Bạn có chắc muốn xóa sinh viên này không?')) {
            this.students.splice(index, 1);
            this.saveData();
            this.displayStudents();
        }
    }

    // Sửa thông tin sinh viên
    editStudent(index) {
        const student = this.students[index];
        document.getElementById('id').value = student.id;
        document.getElementById('name').value = student.name;
        document.getElementById('gender').value = student.gender;
        document.getElementById('dob').value = student.dob;
        document.getElementById('homeTown').value = student.hometown;

        // Đổi nút "Thêm" thành "Cập nhật"
        document.getElementById('add-button').style.display = 'none';
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Cập nhật Sinh Viên';
        updateButton.id = 'update-button';
        updateButton.onclick = () => this.updateStudent(index);
        document.querySelector('form').appendChild(updateButton);
    }

    // Cập nhật thông tin sinh viên sau khi sửa
    updateStudent(index) {
        const id = document.getElementById('id').value.trim();
        const name = document.getElementById('name').value.trim();
        const gender = document.getElementById('gender').value;
        const dob = document.getElementById('dob').value;
        const hometown = document.getElementById('homeTown').value.trim();

        if (!id || !name || !gender || !dob || !hometown) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // Cập nhật thông tin sinh viên
        this.students[index] = new SinhVien(id, name, gender, dob, hometown);
        this.saveData();
        this.displayStudents();

        // Reset lại form và đổi nút "Cập nhật" thành "Thêm"
        document.querySelector('form').reset();
        document.getElementById('add-button').style.display = 'block';
        document.getElementById('update-button').remove();
    }

    // Lưu danh sách sinh viên vào localStorage
    saveData() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }
}

// Khởi tạo đối tượng quản lý sinh viên
const studentManager = new QuanLySinhVien();

// Xử lý sự kiện khi form được submit
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Lấy dữ liệu từ form
    const id = document.getElementById('id').value.trim();
    const name = document.getElementById('name').value.trim();
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const hometown = document.getElementById('homeTown').value.trim();

    // Kiểm tra nếu thiếu thông tin thì báo lỗi
    if (!id || !name || !gender || !dob || !hometown) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    // Tạo đối tượng sinh viên mới
    const student = new SinhVien(id, name, gender, dob, hometown);

    // Thêm sinh viên vào danh sách
    studentManager.addStudent(student);

    // Xóa các giá trị nhập trong form
    document.querySelector('form').reset();
});
