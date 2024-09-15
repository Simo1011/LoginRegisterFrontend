// Ensure that CreateTask is exported correctly
import React, { useState } from "react"; // This makes it a module because of import
import { createTask } from "../services/TaskService";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CreateTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate(); // Use navigate to redirect

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const taskData = { title, description, dueDate, completed };
    try {
      await createTask(taskData);
      alert("Task created successfully!");
      setTitle("");
      setDescription("");
      setDueDate("");
      setCompleted(false);
      navigate('/tasks'); 
    } catch (error) {
      console.error("Error creating task", error);
      alert("Failed to create task");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Create New Task</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="datetime-local" // Change this to datetime-local
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Task
        </Button>
      </Form>
    </div>
  );
};

// Make sure this file has an export
export default CreateTask;
