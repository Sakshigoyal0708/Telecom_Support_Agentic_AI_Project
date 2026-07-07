const RecommendedPlan = () => {
  return (
    <div className="card protocol-panel">
      <h2>Plan Recommendation Outcomes</h2>

      <div className="protocol-layout">
        <div className="protocol-metrics">
          <div>
            <p>Upgrade Suggestions</p>
            <h3>41%</h3>
          </div>
          <div>
            <p>Downgrade Savings Plans</p>
            <h3>33%</h3>
          </div>
          <div>
            <p>Add-On Optimization</p>
            <h3>26%</h3>
          </div>
        </div>

        <div className="protocol-bars">
          <div>
            <span className="bar bar-ot" />
            <span>Upgrade</span>
          </div>
          <div>
            <span className="bar bar-it" />
            <span>Downgrade</span>
          </div>
          <div>
            <span className="bar bar-icmp" />
            <span>Family</span>
          </div>
          <div>
            <span className="bar bar-other" />
            <span>Add-On</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedPlan;