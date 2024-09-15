import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTask, getAllTasks } from '../services/TaskService';
import { Button, Form } from 'react-bootstrap';

const UpdateTask: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    if (taskId) {
      fetchTask(taskId);
    } else {
      alert('Task ID is not available.');
      navigate('/tasks');
    }
  }, [taskId]);

  const fetchTask = async (id: string) => {
    try {
      const response = await getAllTasks();
      const taskToUpdate = response.data.find((t: any) => t.id === parseInt(id));
      setTask(taskToUpdate);
    } catch (error) {
      console.error('Error fetching task', error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    try {
      await updateTask(task.id, task);
      alert('Task updated successfully!');
      navigate('/tasks');
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  return (
    task && (
      <div className="container mt-4">
        <h3>Update Task</h3>
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Completed"
              checked={task.completed}
              onChange={(e) => setTask({ ...task, completed: e.target.checked })}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Task
          </Button>
        </Form>
      </div>
    )
  );
};

// Make sure this file has an export
export default UpdateTask;
