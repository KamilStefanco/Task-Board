# **Task Board**

📌 **Task Board** is a project management application designed to create, track, and manage projects efficiently. It provides an intuitive interface for organizing tasks within projects, ensuring seamless workflow management.

## ✨ **Features**
- 📂 **Project Management** – Create, edit, and delete projects.
- ✅ **Task Tracking** – Add tasks to projects with statuses: **Open, In Progress, and Done**.
- 🎯 **Drag & Drop** – Easily update task status by dragging it to the appropriate column.
- ✏️ **Task Editing** – Modify task details anytime.
- 🗑 **Deletion** – Remove tasks and projects when no longer needed.
- 🎨 **Minimalist Design** – Clean and user-friendly interface for efficient project tracking.

## 📷 **Screenshots**

### Projects page:
![projects](https://github.com/user-attachments/assets/76cf5772-e038-4f46-b5e7-c6e17d955984)

### Tasks page:
![tasks](https://github.com/user-attachments/assets/f01b6c88-4721-4714-9e47-96e8b61ca703)

### Add project:
![addProject](https://github.com/user-attachments/assets/a4dbbb43-5153-4ac6-aa77-7c04866e458b)

### Add task:
![addTask](https://github.com/user-attachments/assets/e1a6b47e-8c22-45c0-acc3-aee289c8f540)

### Edit task:
![editTask](https://github.com/user-attachments/assets/c1724da6-580f-461e-811e-c9c8ed566441)


## 🚀 **Installation and Setup**

### **Frontend (React)**
1. Clone the repository:
   ```bash
   git clone https://github.com/KamilStefanco/Task-Board.git
   cd task-board/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```

### **Backend (Spring Boot, PostgreSQL)**
1. Navigate to the backend directory:
   ```bash
   cd task-board/backend
   ```
2. Configure database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/task_board_db
   spring.datasource.username=your_user
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```
3. Build and run the backend:
   ```bash
   mvn spring-boot:run
   ```

## 🛠 **Technologies Used**
- **Frontend:** React
- **Backend:** Java, Spring Boot, JPA, PostgreSQL
- **Database:** PostgreSQL
- **Build Tools:** Maven, npm


