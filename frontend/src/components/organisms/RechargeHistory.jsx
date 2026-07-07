const RechargeHistory = () => {
  return (
    <div className="card status-card">
      <h2>Troubleshooting Assistant</h2>
      <div className="status-content">
        <div>
          <span className="status-pill fair">Parallel Checks</span>
          <p>Outage, router, plan, and speed history checks run in a single diagnostic burst.</p>
          <p>Policy-approved actions include router restart and Wi-Fi channel switch.</p>
        </div>
        <div className="status-ring" style={{ "--percent": "84%" }}>
          <span>84%</span>
        </div>
      </div>
    </div>
  );
};

export default RechargeHistory;