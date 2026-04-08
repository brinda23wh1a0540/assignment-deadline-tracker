import express from 'express';
import {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getDashboardStats,
} from '../controllers/assignmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// GET routes
router.get('/', getAssignments);
router.get('/stats/dashboard', getDashboardStats);
router.get('/:id', getAssignmentById);

// POST route
router.post('/', createAssignment);

// PUT route
router.put('/:id', updateAssignment);

// DELETE route
router.delete('/:id', deleteAssignment);

export default router;