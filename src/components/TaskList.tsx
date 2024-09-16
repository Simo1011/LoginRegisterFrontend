import React, { useEffect, useState } from "react";
import { deleteTask, getAllTasks } from "../services/TaskService";
import { Button, Modal, Table, Form } from "react-bootstrap"; // Imported Form for search bar
import { useLocation, useNavigate } from "react-router-dom";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]); // Initialize tasks as an empty array
  const [error, setError] = useState<string | null>(null); // State for handling errors
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [showModal, setShowModal] = useState(false); // State to handle the modal visibility
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null); // State to track which task is going to be deleted
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route location
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all"); // Add filter state

  // Re-fetch the tasks when the component mounts or the location changes
  useEffect(() => {
    fetchTasks();
  }, [location]);

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data || []); // Set tasks data or empty array if data is undefined
    } catch (error) {
      setError("Failed to fetch tasks"); // Set error state if the request fails
      console.error("Error fetching tasks:", error);
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>; // Display error message
  }

  // Handle search term change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle task deletion
  const handleDelete = (taskId: number) => {
    setTaskToDelete(taskId);
    setShowModal(true); // Show confirmation modal
  };

  const confirmDelete = async () => {
    if (taskToDelete !== null) {
      try {
        await deleteTask(taskToDelete);
        fetchTasks(); // Refresh task list after deletion
        setShowModal(false); // Close modal
      } catch (error) {
        console.error("Error deleting task", error);
      }
    }
  };
   // Handle task update navigation
   const handleUpdate = (taskId: number) => {
    navigate(`/tasks/${taskId}/edit`); // Navigate to the task edit page with the task ID
  };

  // Filter tasks based on the filter state and search term
  const filteredTasks = tasks.filter((task) => {
    // Apply search term filter
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply completion status filter
    const matchesFilter = filter === "completed" ? task.completed :
                          filter === "pending" ? !task.completed : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mt-4">
      <h3>Your Tasks</h3>

      {/* Search bar */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>

      {/* Filter Buttons */}
      <div className="mb-3">
        <Button
          variant={filter === "all" ? "primary" : "secondary"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>{" "}
        <Button
          variant={filter === "completed" ? "primary" : "secondary"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>{" "}
        <Button
          variant={filter === "pending" ? "primary" : "secondary"}
          onClick={() => setFilter("pending")}
        >
          Pending
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Completed</th>
            <th>Actions</th> {/* Add a new column for actions */}
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.completed ? "Yes" : "No"}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleUpdate(task.id)} // Navigate to update page
                  className="me-2"
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(task.id)} // Show modal before deletion
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
