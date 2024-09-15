import React, { useEffect, useState } from 'react';
import { getAllTasks } from '../services/TaskService';
import { Table } from 'react-bootstrap';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);  // Initialize tasks as an empty array
  const [error, setError] = useState<string | null>(null);  // State for handling errors

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data || []);  // Set tasks data or empty array if data is undefined
    } catch (error) {
      setError('Failed to fetch tasks');  // Set error state if the request fails
      console.error('Error fetching tasks:', error);
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;  // Display error message
  }

  return (
    <div className="container mt-4">
      <h3>Your Tasks</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <td>{task.completed ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No tasks available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TaskList;
