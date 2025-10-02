import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCogs,
  faQrcode,
  faClipboardList,
  faFileInvoice,
  faTruck,
  faChartLine,
  faBoxOpen,
  faDatabase, faProjectDiagram
  
} from "@fortawesome/free-solid-svg-icons";


import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { ProgressBar } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Cards data
const cardsData = [
  {
    title: "Total Fittings Marked",
    value: "2,847",
    change: "+12% from last week",
    icon: faCogs,
    color: "#1A3C8E",
  },
  { title: "Pending Markings", value: "156", change: "-23% from last week", icon: faClipboardList, color: "#FF6B6B" },
  { title: "QR Codes Generated", value: "5,000", change: "+3% last 3 week", icon: faQrcode, color: "#4DA8DA" },
  { title: "Active Laser Units", value: "8", change: "2 offline from last week", icon: faTruck, color: "#3BB273" },
];

// Sidebar menu
const menuItems = [
  { name: "Goods Control", icon: faBoxOpen },
  { name: "QR Generation", icon: faQrcode },
  { name: "Vendor Batch", icon: faClipboardList },
  { name: "Warranty Claims", icon: faFileInvoice },
  { name: "Logistics Coordination", icon: faTruck },
  { name: "UDM Reports", icon: faChartLine },
];

const DepotStaffDashboard = ({ userId }) => {
  const [activeMenu, setActiveMenu] = useState("Goods Control");
  const [qrList, setQrList] = useState([]);

  // Example data vendor batchh------------------------------------------------------
     const [vendorBatches, setVendorBatches] = useState([
  { vendorName: "Vendor A", vendorId: "VA001", item: "Rail Pad", quantity: 500, batchNo: "B001", verified: false, qrGenerated: true },
  { vendorName: "Vendor B", vendorId: "VB002", item: "Elastic Clip", quantity: 300, batchNo: "B002", verified: true, qrGenerated: true },
  { vendorName: "Vendor C", vendorId: "VC003", item: "Fish Plates", quantity: 200, batchNo: "B003", verified: false, qrGenerated: false },
  { vendorName: "Vendor D", vendorId: "VD004", item: "Bolts and Nuts", quantity: 400, batchNo: "B004", verified: true, qrGenerated: true },
  { vendorName: "Vendor E", vendorId: "VE005", item: "Rail Anchors", quantity: 150, batchNo: "B005", verified: false, qrGenerated: false },
  { vendorName: "Vendor F", vendorId: "VF006", item: "Pipe Wrenches", quantity: 80, batchNo: "B006", verified: true, qrGenerated: true },
]);

  const [newBatch, setNewBatch] = useState({ vendorName: "", vendorId: "", item: "", quantity: "", batchNo: "", verified: false, qrGenerated: false });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddBatch = () => {
    if (!newBatch.vendorName || !newBatch.item || !newBatch.quantity || !newBatch.batchNo) return;
    setVendorBatches([newBatch, ...vendorBatches]);
    setNewBatch({ vendorName: "", vendorId: "", item: "", quantity: "", batchNo: "", verified: false, qrGenerated: false });
    setShowAddForm(false);
  };

  const handleVerifyVendor = (index) => {
    const updatedBatches = [...vendorBatches];
    updatedBatches[index].verified = true;
    setVendorBatches(updatedBatches);
  
  };
//-----------------------------------------------------------------------------------

  // Warranty claims state--------------------------------------
  const [warrantyList, setWarrantyList] = useState([
  { item: "Rail Pad", issue: "Crack in product", status: "In Review", date: "20-Sep-2025" },
  { item: "Elastic Clip", issue: "Rusting", status: "Approved", date: "19-Sep-2025" },
  { item: "Liner", issue: "Wrong dimensions", status: "Pending", date: "18-Sep-2025" },
  { item: "Fish Plates", issue: "Loose fitting", status: "Pending", date: "21-Sep-2025" },
  { item: "Bolts and Nuts", issue: "Thread damage", status: "In Review", date: "21-Sep-2025" },
  { item: "Rail Anchors", issue: "Crack detected", status: "Pending", date: "21-Sep-2025" },
  { item: "Pipe Wrenches", issue: "Rusting", status: "Approved", date: "21-Sep-2025" },
]);


  const [newClaim, setNewClaim] = useState({ item: "", issue: "", status: "Pending", date: "" });

  const handleAddClaim = () => {
    if (!newClaim.item || !newClaim.issue) return;
    setWarrantyList([{ ...newClaim, date: new Date().toLocaleDateString("en-GB") }, ...warrantyList]);
    setNewClaim({ item: "", issue: "", status: "Pending", date: "" });
  };
  //------------------------------------------------------------

  // logistic co ordination--------------------------------------------
  const [shipments, setShipments] = useState([
  { destination: "Delhi", item: "Elastic Rail Clips", quantity: 200, qr: "QR001", status: "In Transit" },
  { destination: "Mumbai", item: "Rail Pads", quantity: 150, qr: "QR002", status: "Delivered" },
  { destination: "Kolkata", item: "Liners", quantity: 100, qr: "QR003", status: "Pending" },
  { destination: "Chennai", item: "Sleepers", quantity: 50, qr: "QR004", status: "In Transit" },
  { destination: "Bangalore", item: "Fish Plates", quantity: 80, qr: "QR005", status: "Pending" },
  { destination: "Hyderabad", item: "Bolts and Nuts", quantity: 120, qr: "QR006", status: "In Transit" },
  { destination: "Ahmedabad", item: "Rail Anchors", quantity: 60, qr: "QR007", status: "Delivered" },
  { destination: "Pune", item: "Pipe Wrenches", quantity: 30, qr: "QR008", status: "In Transit" },
]);

const [filterStatus, setFilterStatus] = useState("All");

// Function to mark delivered
const handleMarkDelivered = (index) => {
  const updated = [...shipments];
  updated[index].status = "Delivered";
  setShipments(updated);
};
//----------------------------------------------------------------------------------------------------

 //UDM REPORT-------------------------------------------------------------------------------------------
 const [udmReports, setUdmReports] = useState([
  { name: "Vendor Performance", icon: faClipboardList, status: "Generated", lastRun: "20-Sep-2025" },
  { name: "Supply Timelines", icon: faTruck, status: "Pending", lastRun: "19-Sep-2025" },
  { name: "Warranty Alerts", icon: faFileInvoice, status: "Generated", lastRun: "18-Sep-2025" },
  { name: "Inspection Trends", icon: faChartLine, status: "Pending", lastRun: "17-Sep-2025" },
  { name: "UDM Integration", icon: faDatabase, status: "Connected", lastRun: "20-Sep-2025" },
  { name: "TMS Integration", icon: faProjectDiagram, status: "Connected", lastRun: "19-Sep-2025" },
]);

const handleGenerateReport = (index) => {
  const updatedReports = [...udmReports];
  updatedReports[index].status = "Generated";
  updatedReports[index].lastRun = new Date().toLocaleDateString("en-GB");
  setUdmReports(updatedReports);
};
//---------------------------------------------------------------------------------------------------------

  //QR generation-----------------------------------------------------------------------------------------
  const handleGenerateQR = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const qrData = Object.fromEntries(formData.entries());
    setQrList([...qrList, qrData]);
    e.target.reset();
  };
 //----------------------------------------------------------
  const renderContent = () => {
    switch (activeMenu) {
      case "Goods Control":
      const stockData = [
  { item: "Elastic Rail Clips", available: 500, max: 600, lastUpdated: "20-Sep-2025", status: "In Stock" },
  { item: "Rail Pads", available: 1200, max: 1500, lastUpdated: "19-Sep-2025", status: "In Stock" },
  { item: "Liners", available: 800, max: 1000, lastUpdated: "18-Sep-2025", status: "Inspection Pending" },
  { item: "Sleepers", available: 300, max: 500, lastUpdated: "17-Sep-2025", status: "Dispatched" },
  { item: "Fish Plates", available: 150, max: 200, lastUpdated: "21-Sep-2025", status: "In Stock" },
  { item: "Bolts and Nuts", available: 400, max: 500, lastUpdated: "21-Sep-2025", status: "In Stock" },
  { item: "Rail Anchors", available: 100, max: 150, lastUpdated: "21-Sep-2025", status: "Inspection Pending" },
  { item: "Pipe Wrenches", available: 50, max: 80, lastUpdated: "21-Sep-2025", status: "Dispatched" },
];



        const chartData = {
          labels: stockData.map((s) => s.item),
          datasets: [
            { label: "Stock Available", data: stockData.map((s) => s.available), backgroundColor: "#4DA8DA" },
            { label: "Stock Used", data: stockData.map((s) => s.max - s.available), backgroundColor: "#FF6B6B" },
          ],
        };

        const chartOptions = {
          responsive: true,
          plugins: { legend: { position: "top" }, title: { display: true, text: "Weekly Stock Status" } },
        };

        return (
          <div>
            <h2 className="mb-4">Goods Control</h2>

            {/* Cards with progress bars */}
            <div className="row g-3 mb-4">
              {stockData.map((stock, idx) => {
                const percent = Math.round((stock.available / stock.max) * 100);
                return (
                  <div className="col-md-6 col-lg-3" key={idx}>
                    <div
                      className="card shadow-sm h-100 border-top border-4"
                      style={{
                        borderTopColor:
                          stock.status === "Dispatched"
                            ? "#FF6B6B"
                            : stock.status === "Inspection Pending"
                            ? "#FFD93D"
                            : "#3BB273",
                      }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{stock.item}</h5>
                        <p className="mb-1">
                          <strong>Available:</strong> {stock.available} / {stock.max}
                        </p>
                        <ProgressBar now={percent} label={`${percent}%`} className="mb-2" />
                        <p
                          className={`badge ${
                            stock.status === "Dispatched"
                              ? "bg-danger"
                              : stock.status === "Inspection Pending"
                              ? "bg-warning text-dark"
                              : "bg-success"
                          }`}
                        >
                          {stock.status}
                        </p>
                      </div>
                      {/* <div className="card-footer d-flex justify-content-between">
                        <button className="btn btn-sm btn-outline-primary">Update Status</button>
                        <button className="btn btn-sm btn-outline-secondary">View Details</button>
                      </div> */}
                      <div className="card-footer d-flex flex-column gap-2">
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary w-50" > + Add Stock</button>
                          <button className="btn btn-sm btn-outline-danger w-50" >- Remove </button>
                        </div>
                        <div className="d-flex justify-content-between">
                          <button className="btn btn-sm btn-outline-secondary">View Details</button>
                          <small className="text-muted"></small>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bar chart */}
            <div className="card p-3 shadow-sm">
              <h4 className="mb-3">Weekly Stock Chart</h4>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        );

      case "QR Generation":
        const exampleQRList = [
          {
            componentId: "COMP123",
            vendorId: "Vendor A",
            batchNo: "VB001",
            railwayDivision: "Northern",
            section: "Section 1",
            specification: "Standard",
            supplyDate: "15-Sep-2025",
            warranty: "2 years",
            inspection: "Passed initial quality check",
          },
          {
            componentId: "COMP456",
            vendorId: "Vendor B",
            batchNo: "VB002",
            railwayDivision: "Eastern",
            section: "Section 2",
            specification: "Heavy Duty",
            supplyDate: "12-Sep-2025",
            warranty: "3 years",
            inspection: "Passed initial quality check",
          },
          {
            componentId: "COMP789",
            vendorId: "Vendor C",
            batchNo: "VB003",
            railwayDivision: "Western",
            section: "Section 3",
            specification: "Light Weight",
            supplyDate: "10-Sep-2025",
            warranty: "1 year",
            inspection: "Pending inspection",
          },
        ];

        const combinedQRList = [...exampleQRList, ...qrList];

        return (
          <div className="row">
            <div className="col-md-6">
              <h2>Generate QR Code</h2>
              <form onSubmit={handleGenerateQR} className="row g-3 mb-4">
                <div className="col-md-6">
                  <input className="form-control" name="componentId" placeholder="Component ID" required />
                </div>
                <div className="col-md-6">
                  <input className="form-control" name="railwayDivision" placeholder="Railway Division" required />
                </div>
                <div className="col-md-6">
                  <input className="form-control" name="vendorId" placeholder="Vendor ID" required />
                </div>
                <div className="col-md-6">
                  <input className="form-control" name="batchNo" placeholder="Batch No" required />
                </div>
                <div className="col-md-6">
                  <input className="form-control" name="section" placeholder="Section" required />
                </div>
                <div className="col-md-6">
                  <input className="form-control" name="specification" placeholder="Specification" required />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary w-100">
                    Generate QR
                  </button>
                </div>
              </form>

              <hr />

              <h4>Example Scanned QR</h4>
              <p>Data extracted from a QR code:</p>
              <div className="card p-3 mt-3 shadow-sm">
                <h5>Scanned QR Details:</h5>
                <p>
                  <strong>Vendor Info:</strong> {exampleQRList[0].vendorId}
                </p>
                <p>
                  <strong>Lot Number:</strong> {exampleQRList[0].batchNo}
                </p>
                <p>
                  <strong>Date of Supply:</strong> {exampleQRList[0].supplyDate}
                </p>
                <p>
                  <strong>Warranty Period:</strong> {exampleQRList[0].warranty}
                </p>
                <p>
                  <strong>Inspection History:</strong> {exampleQRList[0].inspection}
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <h2>Generated QR List</h2>
              <ul className="list-group">
                {combinedQRList.map((qr, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <FontAwesomeIcon icon={faQrcode} className="me-2" />
                      {qr.componentId} - {qr.vendorId} (Batch {qr.batchNo})
                      <div className="text-muted small">
                        {qr.railwayDivision}, {qr.section}, {qr.specification}
                      </div>
                    </div>
                    <button className="btn btn-sm btn-success">View</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
        
  

   case "Vendor Batch":
        return (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2>Vendor Batches</h2>
              <button className="btn btn-success" onClick={() => setShowAddForm(!showAddForm)}>+ Add Vendor Batch</button>
            </div>

            {showAddForm && (
              <div className="card p-3 mb-4 shadow-sm">
                <div className="row g-3">
                  <div className="col-12 col-md-6 col-lg-4">
                    <input
                      className="form-control"
                      placeholder="Vendor Name"
                      value={newBatch.vendorName}
                      onChange={(e) => setNewBatch({ ...newBatch, vendorName: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <input
                      className="form-control"
                      placeholder="Vendor ID"
                      value={newBatch.vendorId}
                      onChange={(e) => setNewBatch({ ...newBatch, vendorId: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <input
                      className="form-control"
                      placeholder="Item"
                      value={newBatch.item}
                      onChange={(e) => setNewBatch({ ...newBatch, item: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Quantity"
                      value={newBatch.quantity}
                      onChange={(e) => setNewBatch({ ...newBatch, quantity: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <input
                      className="form-control"
                      placeholder="Batch No"
                      value={newBatch.batchNo}
                      onChange={(e) => setNewBatch({ ...newBatch, batchNo: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 d-flex align-items-center">
                    <button className="btn btn-primary w-100" onClick={handleAddBatch}>Add Batch</button>
                  </div>
                </div>
              </div>
            )}

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {vendorBatches.map((batch, index) => (
                <div key={index} className="col">
                  <div className="card shadow-sm p-3 h-100" style={{ borderLeft: `5px solid ${batch.verified ? "#3BB273" : "#FF6B6B"}` }}>
                    <h5 className="card-title">{batch.vendorName} ({batch.vendorId})</h5>
                    <p className="mb-1"><strong>Item:</strong> {batch.item}</p>
                    <p className="mb-1"><strong>Quantity:</strong> {batch.quantity}</p>
                    <p className="mb-1"><strong>Batch No:</strong> {batch.batchNo}</p>
                    <p className="mb-1">
                      <strong>Verified:</strong> 
                      {batch.verified ? <span className="badge bg-success ms-2">Yes</span> : <span className="badge bg-warning text-dark ms-2">No</span>}
                    </p>
                    <p className="mb-3">
                      <strong>QR Generated:</strong> 
                      {batch.qrGenerated ? <span className="badge bg-info ms-2">Yes</span> : <span className="badge bg-secondary ms-2">No</span>}
                    </p>
                    {!batch.verified && (
                      <button className="btn btn-primary w-100" onClick={() => handleVerifyVendor(index)}>Verify Vendor</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );


      case "Warranty Claims":
        return (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2>Warranty Claims</h2>
              <button className="btn btn-success" onClick={handleAddClaim}>
                + New Claim
              </button>
            </div>

            <div className="card p-3 mb-4 shadow-sm">
              <div className="row g-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Item Name"
                    value={newClaim.item}
                    onChange={(e) => setNewClaim({ ...newClaim, item: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Issue"
                    value={newClaim.issue}
                    onChange={(e) => setNewClaim({ ...newClaim, issue: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={newClaim.status}
                    onChange={(e) => setNewClaim({ ...newClaim, status: e.target.value })}
                  >
                    <option>Pending</option>
                    <option>In Review</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle shadow-sm">
                <thead className="table-dark">
                  <tr>
                    <th>Item</th>
                    <th>Issue</th>
                    <th>Status</th>
                    <th>Date Reported</th>
                    <th>Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {warrantyList.map((claim, idx) => (
                    <tr
                      key={idx}
                      className={
                        claim.status === "Rejected" || claim.status === "Pending"
                          ? "table-warning"
                          : claim.status === "Approved"
                          ? "table-success"
                          : ""
                      }
                    >
                      <td>{claim.item}</td>
                      <td>{claim.issue}</td>
                      <td>{claim.status}</td>
                      <td>{claim.date}</td>
                      <td>
                        {claim.status !== "Approved" ? (
                          <span className="badge bg-danger">Flagged</span>
                        ) : (
                          <span className="badge bg-success">OK</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

        case "Logistics Coordination":
  const filteredShipments = filterStatus === "All" ? shipments : shipments.filter(s => s.status === filterStatus);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Logistics Coordination</h2>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={() => setFilterStatus("All")}>All</button>
          <button className="btn btn-outline-warning me-2" onClick={() => setFilterStatus("In Transit")}>In Transit</button>
          <button className="btn btn-outline-success me-2" onClick={() => setFilterStatus("Delivered")}>Delivered</button>
          <button className="btn btn-outline-secondary" onClick={() => setFilterStatus("Pending")}>Pending</button>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {filteredShipments.map((shipment, index) => (
          <div className="col" key={index}>
            <div className="card shadow-sm p-3 h-100" style={{ borderLeft: `5px solid ${shipment.status === "Delivered" ? "#3BB273" : shipment.status === "In Transit" ? "#FFD93D" : "#FF6B6B"}` }}>
              <h5 className="card-title">{shipment.item}</h5>
              <p className="mb-1"><strong>Destination:</strong> {shipment.destination}</p>
              <p className="mb-1"><strong>Quantity:</strong> {shipment.quantity}</p>
              <p className="mb-1"><strong>QR Code:</strong> {shipment.qr}</p>
              <p className="mb-1">
                <strong>Status:</strong> 
                <span className={`badge ms-2 ${shipment.status === "Delivered" ? "bg-success" : shipment.status === "In Transit" ? "bg-warning text-dark" : "bg-secondary"}`}>
                  {shipment.status}
                </span>
              </p>
              <ProgressBar now={shipment.status === "Delivered" ? 100 : shipment.status === "In Transit" ? 50 : 20} label={`${shipment.status === "Delivered" ? 100 : shipment.status === "In Transit" ? 50 : 20}%`} className="mb-2" />
              {shipment.status !== "Delivered" && (
                <button className="btn btn-primary w-100" onClick={() => handleMarkDelivered(index)}>Mark Delivered</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
case "UDM Reports":
  return (
    <div>
      <h2 className="mb-4">UDM Reports & Analytics</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {udmReports.map((report, index) => (
          <div className="col" key={index}>
            <div className="card h-100 shadow-sm p-3" style={{ borderLeft: `5px solid ${report.status === "Generated" ? "#3BB273" : "#FFD93D"}` }}>
              <div className="d-flex align-items-center mb-3">
                <FontAwesomeIcon icon={report.icon} size="2x" className="me-3" color="#1A3C8E" />
                <h5 className="mb-0">{report.name}</h5>
              </div>
              <p className="mb-2">
                <strong>Status:</strong>{" "}
                <span className={`badge ${report.status === "Generated" ? "bg-success" : "bg-warning text-dark"}`}>{report.status}</span>
              </p>
              <p className="mb-3"><strong>Last Run:</strong> {report.lastRun}</p>
              {report.status !== "Generated" && (
                <button className="btn btn-outline-primary w-100" onClick={() => handleGenerateReport(index)}>
                  <FontAwesomeIcon icon={faFileInvoice} className="me-2" />
                  Generate Report
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 shadow-sm rounded bg-white">
        <h5>Data Sources & Integrations</h5>
        <ul className="list-unstyled">
          <li><FontAwesomeIcon icon={faDatabase} className="me-2 text-primary" /> UDM (User Depot Module)</li>
          <li><FontAwesomeIcon icon={faProjectDiagram} className="me-2 text-primary" /> TMS (Track Management System)</li>
          <li><FontAwesomeIcon icon={faTruck} className="me-2 text-primary" /> Indian Railways Portals</li>
          <li><FontAwesomeIcon icon={faChartLine} className="me-2 text-primary" /> Auto-fetch & push data</li>
        </ul>
      </div>
    </div>
  );

      default:
        return <div>Content Coming Soon</div>;
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center text-white p-3 depot-title">
        <h2>Depot Staff Dashboard</h2>
        <div>
          <span className="me-3">User: {userId}</span>
          <button className="btn btn-light me-2">Export UDM</button>
          <button className="btn btn-danger">Logout</button>
        </div>
      </div>

      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 bg-light p-3">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`p-2 mb-2 d-flex align-items-center rounded ${
                activeMenu === item.name ? "bg-primary text-white" : "bg-white border"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setActiveMenu(item.name)}
            >
              <FontAwesomeIcon icon={item.icon} className="me-2" />
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="col-md-7 col-lg-8 p-4 bg-light">{renderContent()}</div>

        {/* Right summary cards */}
        <div className="col-md-3 col-lg-2 p-4 bg-light">
          <h5 className="mb-3">Summary</h5>
          <div className="d-flex flex-column gap-3">
            {cardsData.map((card, index) => (
              <div
                className="dashboard-card p-3 rounded"
                key={index}
                style={{
                  borderTop: `4px solid ${card.color}`,
                  background: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={card.icon} size="2x" color={card.color} className="me-3" />
                  <div>
                    <h6 className="mb-1">{card.title}</h6>
                    <h5 className="mb-1">{card.value}</h5>
                    <small>{card.change}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepotStaffDashboard;
