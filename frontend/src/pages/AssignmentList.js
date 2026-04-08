import React, { useState, useEffect } from 'react';
import { assignmentAPI } from '../api';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await assignmentAPI.getAll();
        setAssignments(response.data);
      } catch (err) {
        setError('Failed to fetch assignments');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        await assignmentAPI.delete(id);
        setAssignments(assignments.filter((a) => a._id !== id));
      } catch (err) {
        setError('Failed to delete assignment');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const assignment = assignments.find((a) => a._id === id);
      await assignmentAPI.update(id, { ...assignment, status: newStatus });
      setAssignments(
        assignments.map((a) =>
          a._id === id ? { ...a, status: newStatus } : a
        )
      );
    } catch (err) {
      setError('Failed to update assignment');
    }
  };

  const filteredAssignments =
    filterStatus === 'all'
      ? assignments
      : assignments.filter((a) => a.status === filterStatus);

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="page-container">
      <div className="container">
        <div className="header flex-between">
          <div>
            <h1>Assignments</h1>
            <p>View and manage all your assignments</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => (window.location.href = '/create-assignment')}
          >
            New Assignment
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="card">
          <label>Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ maxWidth: '200px', marginBottom: '1rem' }}
          >
            <option value="all">All</option>
            <option value="Pending">Pending</option>
            <option value="Submitted">Submitted</option>
            <option value="Late">Late</option>
          </select>

          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No assignments found
                  </td>
                </tr>
              ) : (
                filteredAssignments.map((assignment) => (
                  <tr key={assignment._id}>
                    <td>{assignment.title}</td>
                    <td>{assignment.subject}</td>
                    <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`priority-${assignment.priority.toLowerCase()}`}>
                        {assignment.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${assignment.status.toLowerCase()}`}>
                        {assignment.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex">
                        <button
                          className="btn-primary"
                          style={{ padding: '0.5rem' }}
                          onClick={() =>
                            (window.location.href = `/edit-assignment/${assignment._id}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn-danger"
                          style={{ padding: '0.5rem' }}
                          onClick={() => handleDelete(assignment._id)}
                        >
                          Delete
                        </button>
                        {assignment.status !== 'Submitted' && (
                          <button
                            className="btn-success"
                            style={{ padding: '0.5rem' }}
                            onClick={() => handleStatusChange(assignment._id, 'Submitted')}
                          >
                            Mark Done
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignmentList;
