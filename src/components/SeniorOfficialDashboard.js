import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCogs,
  faChartBar,
  faSyncAlt,
  faShieldAlt,
  faChartLine,
  faStar,
  faTimesCircle,
  faIndustry,
} from "@fortawesome/free-solid-svg-icons";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./Dashboard.css"; // Reuse CSS
import "bootstrap/dist/css/bootstrap.min.css";


// Cards data (right side column)
const cardsData = [
  {
    title: "AI Prediction Accuracy",
    value: "95%",
    change: "+2% from last report",
    icon: faChartLine,
    color: "#1A3C8E",
  },
  {
    title: "Avg Quality Score",
    value: "90.5%",
    change: "Stable over last 2 weeks",
    icon: faStar,
    color: "#FF6B6B",
  },
  {
    title: "Failed Operations",
    value: "1",
    change: "-3 from last month",
    icon: faTimesCircle,
    color: "#F4B400",
  },
  {
    title: "Vendor Performance",
    value: "99%",
    change: "+1% from last quarter",
    icon: faIndustry,
    color: "#3BB273",
  },
];
const vendorPerformanceData = [
  { name: "Vendor A", performance: 85 },
  { name: "Vendor B", performance: 95 },
  { name: "Vendor C", performance: 75 },
  { name: "Vendor D", performance: 90 },
];

const stockLevelData = [
  { month: "Jan", stock: 1200 },
  { month: "Feb", stock: 1150 },
  { month: "Mar", stock: 1320 },
  { month: "Apr", stock: 1250 },
  { month: "May", stock: 1400 },
];

const qualityTrendData = [
  { month: "Jan", quality: 92 },
  { month: "Feb", quality: 90 },
  { month: "Mar", quality: 88 },
  { month: "Apr", quality: 89 },
  { month: "May", quality: 91 },
];


// sample monthly prediction data
const monthlyData = [
  { month: "Apr", predicted: 12, actual: 9 },
  { month: "May", predicted: 18, actual: 16 },
  { month: "Jun", predicted: 9, actual: 11 },
  { month: "Jul", predicted: 24, actual: 20 },
  { month: "Aug", predicted: 20, actual: 22 },
  { month: "Sep", predicted: 15, actual: 13 }
];

// sample section risk data
const sectionData = [
  {
    id: "DL-GZ",
    name: "Delhi - Ghaziabad",
    expectedFailurePct: 18,
    risk: "Medium Risk",
    confidence: 78,
    notes: "Track wear increasing near Km 45-50. Schedule ultrasonic tests."
  },
  {
    id: "MB-PU",
    name: "Mumbai - Pune",
    expectedFailurePct: 32,
    risk: "High Risk",
    confidence: 91,
    notes: "Persistent gauge widening recorded. Urgent tamping recommended."
  },
  {
    id: "CN-AG",
    name: "Chennai - Arakkonam",
    expectedFailurePct: 11,
    risk: "Medium Risk",
    confidence: 64,
    notes: "Minor rail corrugation detected; monitor during next inspection."
  }
];

// click handler
const handleRiskTagClick = (section) => {
  alert(`Clicked risk tag for ${section.name}`);
};
// compilance-------------------------------
const compliances = [
    {
      title: "Quality Compliance",
      description: "Laser-marked QR codes meet Indian Railways standards.",
      icon: "✅", // Use any icon library e.g. FontAwesome here
      color: "#1A3C8E",
    },
    {
      title: "Safety Compliance",
      description: "Adhering to safety norms during laser marking.",
      icon: "🛡️",
      color: "#FF6B6B",
    },
    {
      title: "Data Integrity",
      description: "Accurate, secure QR code data synced with Railways portals.",
      icon: "🔒",
      color: "#3BB273",
    },
    {
      title: "Inspection & Audit",
      description: "History of inspections, defects, and replacements maintained.",
      icon: "📋",
      color: "#F4B400",
    },
    {
      title: "Regulatory Compliance",
      description:
        "Following procedures, calibration, operator training, and regulations.",
      icon: "⚖️",
      color: "#6F42C1",
    },
  ];
  const data = [
  { name: "Quality Compliance", value: 25 },
  { name: "Safety Compliance", value: 20 },
  { name: "Data Integrity", value: 20 },
  { name: "Inspection & Audit", value: 15 },
  { name: "Regulatory Compliance", value: 20 },
];
const COLORS = ["#1A3C8E", "#FF6B6B", "#3BB273", "#F4B400", "#6F42C1"];
//--------------------------------------------------------------------------

// Sidebar items
const menuItems = [
  { name: "Predictive Maintenance", icon: faCogs },
  { name: "Analytics Dashboard", icon: faChartBar },
  { name: "Offline Mode", icon: faSyncAlt },
  { name: "Compliance Assurance System", icon: faShieldAlt },
];

const SeniorDashboard = ({ userId }) => {
  const [activeMenu, setActiveMenu] = useState("Predictive Maintenance");

  const renderContent = () => {
    switch (activeMenu) {
case "Predictive Maintenance":
  return (
    <section className="p-4 bg-white rounded shadow-sm">
      <h2 className="mb-3">Predictive Failure Alerts</h2>
      <p className="text-muted mb-4">AI-driven risk assessment for track sections</p>
      <div className="row">
        {/* Risk Alerts full width */}
        <div className="col-12 mb-4">
          {[
            ...sectionData,
            {
              id: "BL-HYD",
              name: "Bangalore - Hyderabad",
              expectedFailurePct: 14,
              risk: "Medium Risk",
              confidence: 72,
              notes: "Increased track vibrations detected."
            },
            {
              id: "KL-ER",
              name: "Kolkata - Ernakulam",
              expectedFailurePct: 22,
              risk: "High Risk",
              confidence: 88,
              notes: "Cracks reported near Km 76."
            }
          ].map((section) => (
            <div
              key={section.id}
              className="mb-3 p-3 border rounded d-flex flex-column"
              style={{ backgroundColor: "#f9f9f9" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>{section.name}</h5>
                <span
                  className={`badge ${
                    section.risk === "High Risk"
                      ? "bg-danger"
                      : section.risk === "Medium Risk"
                      ? "bg-warning text-dark"
                      : "bg-success"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRiskTagClick(section)}
                >
                  {section.risk}
                </span>
              </div>
              <div>
                <small>{section.expectedFailurePct}% failure expected in next 30 days</small>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2 mb-1">
                <small className="text-muted">Confidence</small>
                <small className="fw-bold">{section.confidence}%</small>
              </div>
              <div className="progress" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-dark"
                  role="progressbar"
                  style={{ width: `${section.confidence}%` }}
                  aria-valuenow={section.confidence}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Failure Prediction Chart below */}
        <div className="col-12">
          <h5>Failure Prediction vs Actual</h5>
          <small className="text-muted mb-3 d-block">
            Model accuracy and trend over the last 6 months
          </small>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData} margin={{ top: 10, right: 30, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  value,
                  name === "predicted" ? "Predicted Failures" : "Actual Failures",
                ]}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );


      case "Analytics Dashboard":
  return (
    <div>
      <h2>Analytics Dashboard</h2>
      <p>Visual graphs for vendor performance, stock levels, quality trends.</p>
      <div className="d-grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Vendor Performance */}
        <div className="p-3 border rounded shadow-sm">
          <h5>Vendor Performance Graph</h5>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={vendorPerformanceData} margin={{top: 20, right: 30, left: 0, bottom: 0}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="performance" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Level */}
        <div className="p-3 border rounded shadow-sm">
          <h5>Stock Level Graph</h5>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={stockLevelData} margin={{top: 20, right: 30, left: 0, bottom: 0}}>
              <defs>
                <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="stock" stroke="#8884d8" fillOpacity={1} fill="url(#colorStock)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quality Trend Full Width */}
        <div className="p-3 border rounded shadow-sm" style={{ gridColumn: "span 2" }}>
          <h5>Quality Trend Graph</h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={qualityTrendData} margin={{top: 20, right: 30, left: 0, bottom: 0}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="quality" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  case "Offline Mode":
  return (
    <div className="offline-container">
      <h2>Offline Mode</h2>
      <p>Mobile scans work without internet; sync later when connected.</p>

      <div className="workflow-box">
        <h3>Example Workflow:</h3>
        <ol>
          <li>Worker scans QR in offline mode.</li>
          <li>Data stored securely on the device locally.</li>
          <li>Once internet connection is available, the system syncs data to the server automatically.</li>
        </ol>
      </div>

      <div className="note-box">
        <p>
          <strong>Note:</strong> Users will be notified of network status and sync
          status clearly through icons and messages.
        </p>
      </div>

      <div className="status-box">
        <p>🟢 Network Status: Online</p>
        <p>🔄 Sync Status: Idle</p>
      </div>

      <button className="scan-button">Scan QR</button>
    </div>
  );


      case "Compliance Assurance System":
         return (
    <div className="p-5 bg-white rounded shadow-md max-w-3xl mx-auto">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Compliance Assurance System
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {compliances.map(({ title, description, icon, color }) => (
          <div
            key={title}
            className="flex items-start gap-4 p-4 border rounded shadow-sm"
          >
            <div
              className="flex items-center justify-center rounded-full text-white"
              style={{ backgroundColor: color, width: 48, height: 48, fontSize: "1.5rem" }}
            >
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <p className="text-gray-600 mt-1">{description}</p>
            </div>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie 
          data={data} 
          dataKey="value" 
          nameKey="name" 
          cx="50%" 
          cy="50%" 
          outerRadius={100} 
          fill="#8884d8" 
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
    </div>
    
  );    

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Top Header */}
      <div className="dashboard-top-header">
        <h1>Senior Official Dashboard</h1>
        <div className="header-actions">
          <span>User: {userId}</span>
          <button className="export-btn">Export Reports</button>
          <button className="logout-btn" onClick={() => (window.location.href = "/")}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="dashboard-main">
        {/* Sidebar */}
        <div className="dashboard-sidebar">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`menu-item ${activeMenu === item.name ? "active" : ""}`}
              onClick={() => setActiveMenu(item.name)}
            >
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Center Content */}
        <div className="dashboard-center">
          <div className="dashboard-content">{renderContent()}


          </div>
        </div>

        {/* Right Cards Column */}
        <div className="dashboard-right-cards">
          <h4 className="mb-2 text-center">Summary</h4>

          {cardsData.map((card, index) => (
            <div
              className="dashboard-card"
              key={index}
              style={{ borderLeft: `5px solid ${card.color}` }}
            >
              <FontAwesomeIcon
                icon={card.icon}
                size="2x"
                color={card.color}
                style={{ marginRight: "15px" }}
              />
              <div>
                <h4>{card.title}</h4>
                <p className="card-value">{card.value}</p>
                <small>{card.change}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeniorDashboard;
