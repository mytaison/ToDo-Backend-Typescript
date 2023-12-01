import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/priority';
import { Status } from '../enums/status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The task title is mandatory.')
    .trim()
    .isString()
    .withMessage('Title needs to be in text format.'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('The task date is mandatory.')
    .isString()
    .withMessage('The date needs to be a vaild date format.'),
  body('description')
    .trim()
    .isString()
    .withMessage('Title needs to be in text format.'),
  body('priority')
    .trim()
    .isIn([Priority.low, Priority.normal, Priority.high])
    .withMessage('Priority only can be normal, high or low.'),
  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Status only can be todo, in progress or completed.'),
];

export const updateValidator: ValidationChain[] = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('The task id is mandatory.')
    .trim()
    .isString()
    .withMessage('ID needs to be in valid UUID format.'),
  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Status only can be todo, in progress or completed.'),
];
