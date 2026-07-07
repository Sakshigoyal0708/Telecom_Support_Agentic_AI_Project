const AIInsights = () => {
  const ringStyle = { "--percent": "95%" } as React.CSSProperties;

  return (
    <div className="card status-card insight-card">
      <h2>Human Handoff Readiness</h2>
      <div className="status-content">
        <div>
          <span className="status-pill good">Live</span>
          <p>Low confidence, sentiment drop, and repeated failure trigger immediate transfer.</p>
          <p>Summary packet includes intent, checks, actions, recommendation, and sentiment.</p>
        </div>
        <div className="status-ring" style={ringStyle}>
          <span>95%</span>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;