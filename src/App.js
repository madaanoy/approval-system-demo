import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [pendingBudgets, setPendingBudgets] = useState([]);

  const fetchPendingBudgets = async () => {
    try {
      const response = await axios.get('http://localhost:5002/pending-budgets');
      setPendingBudgets(response.data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5002/approve-budget/${id}`);
      fetchPendingBudgets(); // Refresh list
    } catch (error) {
      console.error('Approval failed:', error);
    }
  };

  useEffect(() => {
    fetchPendingBudgets();
  }, []);

  return (
    <div className="approval-system">
      <h1>Budget Approval Dashboard</h1>
      <div className="pending-list">
        {pendingBudgets.map(budget => (
          <div key={budget._id} className="approval-item">
            <div className="budget-info">
              <h3>{budget.title}</h3>
              <p>MOOE: ₱{budget.MOOE.toLocaleString()}</p>
              <p>CO: ₱{budget.CO.toLocaleString()}</p>
              <p>PE: ₱{budget.PE.toLocaleString()}</p>
            </div>
            <button 
              onClick={() => handleApprove(budget._id)}
              className="approve-btn"
            >
              Approve Budget
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;