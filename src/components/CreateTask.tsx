// Ensure that CreateTask is exported correctly
import React, { useState } from "react"; // This makes it a module because of import
import { createTask } from "../services/TaskService";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
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
    <Container className="mt-5">
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <div className="border p-4 shadow-sm rounded bg-light">
          <h3 className="text-center mb-4">Create New Task</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Title
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Description
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Due Date
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Completed
              </Form.Label>
              <Col sm={1}>
                <Form.Check
                  type="checkbox" 
                 
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                    className="big-checkbox"
                />
              </Col>
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit" className="me-2">
                Create Task
              </Button>
              <Button variant="secondary" onClick={() => navigate('/tasks')}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  </Container>
  );
};

// Make sure this file has an export
export default CreateTask;
