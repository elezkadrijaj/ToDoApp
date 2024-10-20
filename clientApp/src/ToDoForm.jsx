import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ToDoForm.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

function ToDoForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    isCompleted: false,
    category: 'Work',
  });

  const [tasks, setTasks] = useState([]);

  // Handle change for input fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Fetch all tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://localhost:7064/api/ToDoItems');
      setTasks(response.data);
    } catch (error) {
      toast.error('Error fetching tasks: ' + (error.response ? error.response.data : error.message));
    }
  };

  // Handle form submission using axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7064/api/ToDoItems', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success('Task added successfully!');
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        isCompleted: false,
        category: 'Work',
      });
      fetchTasks(); // Refresh the task list after adding a new task
    } catch (error) {
      toast.error('Error while adding task: ' + (error.response ? error.response.data : error.message));
    }
  };

  // Handle task deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7064/api/ToDoItems/${id}`);
      toast.success('Task deleted successfully!');
      fetchTasks(); // Refresh the task list after deletion
    } catch (error) {
      toast.error('Error while deleting task: ' + (error.response ? error.response.data : error.message));
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">To-Do App</h1>

      {/* Task Form */}
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title">Task Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            placeholder="Enter task title"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            className="form-control"
            placeholder="Enter task description (optional)"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="due-date">Due Date:</label>
          <input
            type="date"
            id="due-date"
            name="dueDate"
            className="form-control"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Errand">Errand</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="is-completed">Is Completed:</label>
          <select
            id="is-completed"
            name="isCompleted"
            className="form-control"
            value={formData.isCompleted}
            onChange={handleChange}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Add Task</button>
      </form>

      {/* Task List */}
      <h2 className="mt-5">All Tasks</h2>
      <div className="row">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div className="col-md-4 mb-4" key={task.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">{task.description}</p>
                  <p><strong>Due Date:</strong> {task.dueDate}</p>
                  <p><strong>Category:</strong> {task.category}</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className={task.isCompleted ? 'text-success' : 'text-danger'}>
                      {task.isCompleted ? 'Completed' : 'Pending'}
                    </span>
                  </p>
                  {/* Delete button */}
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDelete(task.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default ToDoForm;
