import { Router } from 'express';
import { taskController } from './tasks.controller';
import { createValidator, updateValidator } from './task.validator';

// Fire the router function
export const taskRouter: Router = Router();

// Get all tasks
taskRouter.get('/tasks', taskController.getAll);

// Create a new task
taskRouter.post('/tasks', createValidator, taskController.create);

// Update a task
taskRouter.put('/tasks', updateValidator, taskController.update);
