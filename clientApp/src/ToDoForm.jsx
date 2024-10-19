import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './ToDoForm.css'; // Importing a CSS file for styling
import { ToDoItemEndPoint } from './endpoints'; // Import your API endpoint

function ToDoForm() {
  // State to hold form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    isCompleted: false,
    category: 'Work',
  });

  // Handle change for input fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission using axios
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
        const response = await axios.post('https://localhost:7064/api/ToDoItems', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        toast.success('Task added successfully!'); // Show success toast
        console.log('Task added:', response.data);
        // Reset form data here...
    } catch (error) {
        toast.error('Error while adding task: ' + (error.response ? error.response.data : error.message)); // Show error toast
        console.error('Error while adding task:', error);
    }
};



  return (
    <div>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Task Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter task title"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Enter task description (optional)"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="due-date">Due Date:</label>
          <input
            type="date"
            id="due-date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Errand">Errand</option>
          </select>
        </div>
        <div>
          <label htmlFor="is-completed">Is Completed:</label>
          <select
            id="is-completed"
            name="isCompleted"
            value={formData.isCompleted}
            onChange={handleChange}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>
      <ToastContainer /> {/* Add ToastContainer to your component */}
    </div>
  );
}

export default ToDoForm;
