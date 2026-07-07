const OffersSection = () => {
  return (
    <div className="card status-card">
      <h2>Billing Reliability Guardrails</h2>
      <div className="status-content">
        <div>
          <span className="status-pill good">Traceable</span>
          <p>No generated amount is shown unless sourced from invoice records.</p>
          <p>VAT, roaming, EMI, and pro-rata tags are highlighted with evidence.</p>
        </div>
        <div className="status-ring" style={{ "--percent": "97%" }}>
          <span>97%</span>
        </div>
      </div>
    </div>
  );
};

export default OffersSection;