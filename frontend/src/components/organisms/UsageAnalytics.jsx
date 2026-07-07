const UsageAnalytics = () => {
  return (
    <div className="card analytics-panel">
      <h2>Billing Explanation Intelligence</h2>

      <div className="analytics-layout">
        <div className="traffic-summary">
          <p className="summary-label">Invoices Processed</p>
          <h3>30,000</h3>
          <p className="summary-date">Coverage: Last 3 invoice cycles per customer</p>
          <div className="summary-breakdown">
            <div>
              <strong>7,840</strong>
              <span>New Charges Found</span>
            </div>
            <div>
              <strong>3,260</strong>
              <span>Expired Discounts</span>
            </div>
            <div>
              <strong>1,460</strong>
              <span>Anomaly Candidates</span>
            </div>
          </div>
        </div>

        <div className="traffic-donut">
          <div className="donut-chart">
            <span>Users</span>
          </div>
          <ul>
            <li>Traceable to invoice line items: 100%</li>
            <li>RAG confidence above threshold: 92%</li>
            <li>Dispute recommendation trigger rate: 14%</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsageAnalytics;