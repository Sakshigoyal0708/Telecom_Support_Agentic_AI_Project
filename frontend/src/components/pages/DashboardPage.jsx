import { useState } from "react";
import DashboardStats from "../organisms/DashboardStats";
import UsageAnalytics from "../organisms/UsageAnalytics";
import RecommendedPlan from "../organisms/RecommendedPlan";
import OffersSection from "../organisms/OffersSection";
import RechargeHistory from "../organisms/RechargeHistory";
import AIInsights from "../organisms/AIInsights";
import "../styles/dashboard.scss";

const NAV_ITEMS = [
  { label: "Journey Command Center", icon: "◉", href: "/dashboard" },
  { label: "Billing Intelligence",   icon: "₹", href: "/billing-history" },
  { label: "Network Diagnostics",    icon: "⚡", href: "/issue-diagnostics" },
  { label: "Plan Recommendation",    icon: "◈", href: "/plan-advisor" },
  { label: "Human Handoff",          icon: "⇄", href: "/resolution-center" },
  { label: "Audit and Traceability", icon: "≣", href: "/data-behavior" },
];

const ACTION_ITEMS = [
  { label: "Run Invoice Comparison", icon: "→" },
  { label: "Start Parallel Diagnostics", icon: "→" },
  { label: "Trigger Approved Fix", icon: "→" },
  { label: "Create Handoff Summary", icon: "→" },
];

const DashboardPage = ({ authUser, onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="dashboard-container">
      <div className={`dashboard-body ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <aside className={`dashboard-sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>

          {/* ── Identity ─────────────────────────────── */}
          <div className="sidebar-identity">
            <div className="sidebar-logo" aria-hidden="true">
              <span className="sidebar-logo-icon">⬡</span>
            </div>
            {!isSidebarCollapsed && (
              <div className="sidebar-title">
                <span className="sidebar-title-main">Telecom AI</span>
                <span className="sidebar-title-sub">Intelligence Platform</span>
              </div>
            )}
            <button
              type="button"
              className="sidebar-collapse-btn"
              onClick={() => setIsSidebarCollapsed((prev) => !prev)}
              aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={isSidebarCollapsed ? "Expand" : "Collapse"}
            >
              {isSidebarCollapsed ? "›" : "‹"}
            </button>
          </div>

          {/* ── Navigation ───────────────────────────── */}
          <nav className="sidebar-nav" aria-label="Main navigation">
            {!isSidebarCollapsed && (
              <p className="sidebar-section-label">Menu</p>
            )}
            {NAV_ITEMS.map((item, index) => (
              <a
                href={item.href}
                className={`sidebar-nav-item ${index === 0 ? "active" : ""}`}
                key={item.label}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <span className="sidebar-nav-icon" aria-hidden="true">{item.icon}</span>
                {!isSidebarCollapsed && (
                  <span className="sidebar-nav-label">{item.label}</span>
                )}
              </a>
            ))}
          </nav>

          {/* ── Quick Actions ────────────────────────── */}
          <div className="sidebar-actions">
            {!isSidebarCollapsed && (
              <p className="sidebar-section-label">Quick Actions</p>
            )}
            {ACTION_ITEMS.map((item) => (
              <button
                type="button"
                className="sidebar-action-btn"
                key={item.label}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <span className="sidebar-action-icon" aria-hidden="true">{item.icon}</span>
                {!isSidebarCollapsed && (
                  <span className="sidebar-action-label">{item.label}</span>
                )}
              </button>
            ))}
          </div>

          {/* ── Status footer ────────────────────────── */}
          {!isSidebarCollapsed && (
            <div className="sidebar-status">
              <span className="sidebar-status-dot" aria-hidden="true" />
              <span>All systems operational</span>
            </div>
          )}

        </aside>

        <div className="dashboard-content">
          <header className="dashboard-shell-header">
            <div className="top-nav">
              <div className="brand-logo">Telecom AI Experience</div>
              <nav className="nav-links">
                <a href="/dashboard" className="active">Overview</a>
                <a href="/customer-profiles">Customer Context</a>
                <a href="/plan-intelligence">Plan Intelligence</a>
                <a href="/billing-behavior">Billing AI</a>
                <a href="/troubleshooting">Troubleshooting AI</a>
              </nav>
              <div className="top-nav-actions">
                <div className="nav-user">{authUser?.fullName || "Operator Console"}</div>
                <button type="button" className="nav-logout-btn" onClick={onLogout}>Logout</button>
              </div>
            </div>

            <div className="dashboard-header">
              <div>
                <p className="dashboard-kicker">Telecom Advisor AI</p>
                <h1>One Customer, One Journey, One Intelligent Frontend</h1>
                <p className="dashboard-subtitle">
                  Unified command view for intent routing, bill explanation, broadband diagnostics,
                  policy-approved actions, and human handoff with full context continuity.
                </p>
              </div>
              <div className="header-controls">
                <button type="button">POC Week 2</button>
                <button type="button">Live Telemetry</button>
              </div>
            </div>

            <DashboardStats />
          </header>

          <div className="dashboard-main">
            <section className="mission-strip">
              <article>
                <p className="mini-title">Primary Goal</p>
                <h3>70% Billing Query Auto Resolution</h3>
                <p>Every billing explanation card maps values to invoice evidence and flags anomalies before customer escalation.</p>
              </article>
              <article>
                <p className="mini-title">Troubleshooting SLA</p>
                <h3>Diagnosis &lt; 10s, Fix &lt; 120s</h3>
                <p>Parallel checks across outage, router, plan, and speed history reduce customer effort to two questions max.</p>
              </article>
              <article>
                <p className="mini-title">Handoff Promise</p>
                <h3>Context Summary in Under 3s</h3>
                <p>Human agents receive intent, checks, outcomes, attempted actions, and sentiment in a structured packet.</p>
              </article>
            </section>

            <section className="analytics-row">
              <UsageAnalytics />
              <RecommendedPlan />
            </section>

            <section className="status-row">
              <OffersSection />
              <RechargeHistory />
              <AIInsights />
            </section>

            <section className="journey-flow">
              <h2>Broadband Slow Issue - Expected Agent Flow</h2>
              <ol>
                <li>Detect intent and fetch customer context.</li>
                <li>Run outage, plan, router, and speed diagnostics in parallel.</li>
                <li>Generate root cause with confidence score.</li>
                <li>Ask for approval and execute policy-safe remediation.</li>
                <li>Validate before/after metrics and resolve or escalate with full handoff context.</li>
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;