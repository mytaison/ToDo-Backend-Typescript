import { Task } from './tasks.entity';
import { AppDataSource } from '../../index';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';

class TaskController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    // Declare a variable which will hold all the tasks
    let allTasks: Task[];
    // Fetch all tasks using repository
    try {
      allTasks = await AppDataSource.getRepository(Task).find({
        order: {
          date: 'ASC',
        },
      });
      // Convert tasks instance to an array of objects
      allTasks = instanceToPlain(allTasks) as Task[];
      return res.status(200).json(allTasks);
    } catch (_errors) {
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Storing in db
    // Create a new instance of task
    const newTask = new Task();
    // Add the required properties to the task object
    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;
    // Add the new task in database
    let createdTask: Task;
    try {
      createdTask = await AppDataSource.getRepository(Task).save(newTask);
      // Convert task instance to an object
      createdTask = instanceToPlain(createdTask) as Task;
      return res.status(201).json(createdTask);
    } catch (errors) {
      return res.status(500).json(errors);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Finding in DB
    let task: Task | null;
    const task_id = req.body.id;
    const task_status = req.body.status;
    try {
      task = await AppDataSource.getRepository(Task).findOne({
        where: { id: task_id },
      });
      if (!task) {
        return res
          .status(404)
          .json({ error: 'Resource not found with given id.' });
      }
      let updatedTask: UpdateResult;
      updatedTask = await AppDataSource.getRepository(Task).update(
        task_id,
        plainToInstance(Task, { status: task_status }),
      );
      updatedTask = instanceToPlain(updatedTask) as UpdateResult;
      return res.status(200).json(updatedTask);
    } catch (errors) {
      return res.status(500).json(errors);
    }
  }
}

export const taskController = new TaskController();
