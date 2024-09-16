import React, { useEffect, useState } from 'react';
import { deleteTask, getAllTasks } from '../services/TaskService';
import { Button, Modal, Table } from 'react-bootstrap';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);  // Initialize tasks as an empty array
  const [error, setError] = useState<string | null>(null);  // State for handling errors
    // State to handle the modal visibility
    const [showModal, setShowModal] = useState(false);
    // State to track which task is going to be deleted
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

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
  // **Handle task deletion**
  const handleDelete = (taskId: number) => {
    setTaskToDelete(taskId);
    setShowModal(true);  // Show confirmation modal
  };

  const confirmDelete = async () => {
    if (taskToDelete !== null) {
      try {
        await deleteTask(taskToDelete);
        alert('Task deleted successfully');
        fetchTasks();  // Refresh task list after deletion
        setShowModal(false);  // Close modal
      } catch (error) {
        console.error('Error deleting task', error);
      }
    }
  };

  return (
    <div className="container mt-4">
    <h3>Your Tasks </h3>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Completed</th>
          <th>Actions</th>  {/* Add a new column for actions */}
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.dueDate}</td>
            <td>{task.completed ? 'Yes' : 'No'}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(task.id)}  // Show modal before deletion
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

    {/* Confirmation Modal */}
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this task? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={confirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
  );
};

export default TaskList;
