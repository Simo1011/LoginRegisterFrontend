import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateTask, getTaskById } from "../services/TaskService";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const UpdateTask: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>(); // Get the taskId from the URL
  const navigate = useNavigate();
  const [task, setTask] = useState<any>(null); // Task state to hold the fetched task details

  // Fetch the task data when the component mounts
  useEffect(() => {
    if (taskId) {
      fetchTask(parseInt(taskId)); // Fetch the task by ID
    } else {
      alert("Task ID is not available.");
      navigate("/tasks");
    }
  }, [taskId]);

  // Fetch the task by its ID
  const fetchTask = async (id: number) => {
    try {
      const response = await getTaskById(id); // Call the new getTaskById method
      setTask(response.data); // Set the task data into the state
    } catch (error) {
      console.error("Error fetching task", error);
    }
  };

  // Handle the form submission for updating the task
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    try {
      await updateTask(task.id, task); // Call the updateTask method
      alert("Task updated successfully!");
      navigate("/tasks"); // Redirect to the task list
    } catch (error) {
      console.error("Error updating task", error);
    }
  };
  const handleCancel = () => {
    navigate('/tasks');  // Redirect to task list when "Cancel" button is clicked
  };

  return (
    task && (
        <Container className="mt-5">
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <h3 className="text-center mb-4">Update Task</h3>
              <Form onSubmit={handleUpdate}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3} className="text-left">
                    Title
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      value={task.title}
                      onChange={(e) => setTask({ ...task, title: e.target.value })}
                      required
                    />
                  </Col>
                </Form.Group>
  
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3} className="text-left">
                    Description
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={task.description}
                      onChange={(e) => setTask({ ...task, description: e.target.value })}
                      required
                    />
                  </Col>
                </Form.Group>
  
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3} className="text-left">
                    Due Date
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="date"
                      value={task.dueDate?.split('T')[0]}  // Ensure date is formatted for input
                      onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                      required
                    />
                  </Col>
                </Form.Group>
  
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3} className="text-left">
                    Completed
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Check
                      type="checkbox"
                      label=""
                      checked={task.completed}
                      onChange={(e) => setTask({ ...task, completed: e.target.checked })}
                    />
                  </Col>
                </Form.Group>
  
                {/* Add a row for the buttons */}
                <Row className="justify-content-center">
                  <Col xs="auto">
                    <Button variant="primary" type="submit">
                      Update Task
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button variant="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      )
   
  );
};
export default UpdateTask;
