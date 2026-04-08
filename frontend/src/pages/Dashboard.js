import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assignmentAPI } from '../api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    submitted: 0,
    late: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await assignmentAPI.getDashboardStats();
        setStats(response.data);
      } catch (err) {
        setError('Failed to fetch dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="page-container">
      <div className="container">
        <div className="header">
          <h1>Welcome, {user?.name}</h1>
          <p>Manage your assignments efficiently and meet your deadlines</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="grid-4">
          <div className="card">
            <div className="card-header">Total Assignments</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3498db' }}>
              {stats.total}
            </div>
          </div>

          <div className="card">
            <div className="card-header">Pending</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f39c12' }}>
              {stats.pending}
            </div>
          </div>

          <div className="card">
            <div className="card-header">Submitted</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#27ae60' }}>
              {stats.submitted}
            </div>
          </div>

          <div className="card">
            <div className="card-header">Late</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#e74c3c' }}>
              {stats.late}
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '2rem' }}>
          <div className="card-header">Quick Actions</div>
          <div className="flex">
            <button
              className="btn-primary"
              onClick={() => navigate('/create-assignment')}
            >
              Create New Assignment
            </button>
            <button
              className="btn-primary"
              onClick={() => navigate('/assignments')}
            >
              View All Assignments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
