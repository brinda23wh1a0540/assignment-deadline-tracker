import Assignment from '../models/Assignment.js';

// Get all assignments for student or all assignments for admin/faculty
export const getAssignments = async (req, res) => {
  try {
    let assignments;
    if (req.user.role === 'student') {
      // Students see: assignments created by faculty/admin + their own assignments
      const User = (await import('../models/User.js')).default;
      const facultyAdminIds = await User.find({ role: { $in: ['faculty', 'admin'] } }).select('_id');
      const facultyAdminIdList = facultyAdminIds.map(u => u._id);
      
      assignments = await Assignment.find({
        $or: [
          { userId: req.user._id },  // Their own assignments
          { userId: { $in: facultyAdminIdList } }  // Assignments from faculty/admin
        ]
      }).populate('userId', 'name email');
    } else {
      // Faculty and Admin see all assignments
      assignments = await Assignment.find().populate('userId', 'name email');
    }
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single assignment
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate('userId', 'name email');
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create assignment
export const createAssignment = async (req, res) => {
  try {
    const { title, description, subject, dueDate, priority } = req.body;

    if (!title || !subject || !dueDate) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const assignment = new Assignment({
      title,
      description,
      subject,
      dueDate,
      priority: priority || 'Medium',
      userId: req.user._id,
      status: 'Pending',
    });

    const savedAssignment = await assignment.save();
    await savedAssignment.populate('userId', 'name email');

    res.status(201).json(savedAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update assignment
export const updateAssignment = async (req, res) => {
  try {
    const { title, description, subject, dueDate, priority, status } = req.body;

    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Check ownership or admin/faculty role
    if (assignment.userId.toString() !== req.user._id.toString() && req.user.role === 'student') {
      return res.status(403).json({ message: 'Not authorized to update this assignment' });
    }

    assignment.title = title || assignment.title;
    assignment.description = description || assignment.description;
    assignment.subject = subject || assignment.subject;
    assignment.dueDate = dueDate || assignment.dueDate;
    assignment.priority = priority || assignment.priority;
    assignment.status = status || assignment.status;
    assignment.updatedAt = new Date();

    const updated = await assignment.save();
    await updated.populate('userId', 'name email');

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete assignment
export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Check ownership or admin/faculty role
    if (assignment.userId.toString() !== req.user._id.toString() && req.user.role === 'student') {
      return res.status(403).json({ message: 'Not authorized to delete this assignment' });
    }

    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'student') {
      // Students see stats for: their own assignments + faculty/admin assignments
      const User = (await import('../models/User.js')).default;
      const facultyAdminIds = await User.find({ role: { $in: ['faculty', 'admin'] } }).select('_id');
      const facultyAdminIdList = facultyAdminIds.map(u => u._id);
      
      query = {
        $or: [
          { userId: req.user._id },
          { userId: { $in: facultyAdminIdList } }
        ]
      };
    }

    const total = await Assignment.countDocuments(query);
    const pending = await Assignment.countDocuments({ ...query, status: 'Pending' });
    const submitted = await Assignment.countDocuments({ ...query, status: 'Submitted' });
    const late = await Assignment.countDocuments({ ...query, status: 'Late' });

    res.json({
      total,
      pending,
      submitted,
      late,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};