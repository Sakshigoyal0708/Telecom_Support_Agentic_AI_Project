const DashboardStats = () => {
  return (
    <div className="stats-grid">
      <div className="card">
        <h3>Intents Routed by AI</h3>
        <p>12,460</p>
        <span>93.4% confidence</span>
      </div>

      <div className="card">
        <h3>Billing Queries Auto-Resolved</h3>
        <p>71%</p>
        <span>Target 70%</span>
      </div>

      <div className="card">
        <h3>Diagnosis Time (P95)</h3>
        <p>8.6s</p>
        <span>Within SLA</span>
      </div>

      <div className="card">
        <h3>Handoff Summary Delivery</h3>
        <p>2.4s</p>
        <span>Context complete</span>
      </div>
    </div>
  );
};

export default DashboardStats;