import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt,faGlobe,faShield,faEye,faUserGroup,faBoxOpen,faChartColumn} from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import "./LoginPage.css";

    //select options
    const options = [
  { 
    value: 'Depot Staff', 
    label: <span className="option-label"><FontAwesomeIcon icon={faBoxOpen} /> Depot Staff & Procurement Teams</span> 
  },
  { 
    value: 'Senior Official', 
    label: <span className="option-label"><FontAwesomeIcon icon={faChartColumn} /> Senior Official</span> 
  },
];

      const getWidthFromText = (text) => {
     const approxCharWidth = 8; // adjust average char width in px
      const baseWidth = 50; // padding + dropdown arrow area
      return baseWidth + text.length * approxCharWidth;
    };

  

  const LoginPage = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [accessLevel, setAccessLevel] = useState("Depot Staff & Procurement Teams");
  const navigate = useNavigate();
  const handleLogin = () => {
    // Replace with real authentication logic
    if (selected.value === "Depot Staff" && employeeId === "DS001" && password === "depot123") {
      navigate("/depot-staff");
    } else if (selected.value === "Senior Official" && employeeId === "CTE001" && password === "senior123") {
      navigate("/senior-official");
    } else {
      alert("Invalid credentials!");
    }
  };

  //select option used and size 
  const [selected, setSelected] = useState(options[0]);
  const handleChange = selectedOption => setSelected(selectedOption);
  const width = getWidthFromText(selected.label.props.children ? 
  selected.label.props.children.reduce((acc, el) => typeof el === 'string' ? acc + el : acc, '') : selected.label);


  return (
    <div className="login-container">
      <div className="login-header">
      <h1> <FontAwesomeIcon icon={faBolt} /> Railway QR Code System</h1>

      <button className="lang-btn"> <FontAwesomeIcon icon={faGlobe} className="icon-spacing" /> हिंदी </button>

      </div>
      <p className="subtitle">AI-powered Track Fittings Quality Control Portal</p>
      <div className="features">
        <span className="feature"><FontAwesomeIcon icon={faShield} className="icon-spacing" /> Secure Access</span>
        <span className="feature"><FontAwesomeIcon icon={faEye} className="icon-spacing"/> Real-time Monitoring</span>
      </div>

      <div className="login-form">
        <h3><FontAwesomeIcon icon={faUserGroup} />System Login</h3>
        <p>Enter your railway credentials to access the quality control system</p>

        <label>Employee ID</label>
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Enter Employee ID"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />

        <label>Access Level</label>
        <Select
        value={selected}
        onChange={handleChange}
        options={options}
        isSearchable={false}    
        classNamePrefix="custom-select" 
        styles={{
      control: (provided) => ({
          ...provided,
          width: `${width}px`,  // keep your original size
          minHeight: '45px',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
      }),
      
      singleValue: (provided) => ({
          ...provided,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          maxWidth: '100%',           // keeps text inside box
          overflow: 'hidden',         // hide extra text
          textOverflow: 'ellipsis',   // add "..." if too long
          whiteSpace: 'nowrap',       // keep in one line
       }),
    option: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    }),
  }}
/>


        <button className="login-btn" onClick={handleLogin}>
          Login to Dashboard
        </button>
        <hr/>
        <div className="demo-credentials">
          <p className="demo-credentials-title">Demo Credentials:</p>
          <div className="demo-credentials-flex">
          <p>
           <strong>Depot Staff:</strong><br></br> ID: DS001 | Pass: depot123
          </p>
          <p>
            <strong>Senior Official:</strong> <br></br>ID: CTE001 | Pass: senior123
          </p>
          </div>
          
          <p className="support">
            For technical support, contact IT Helpdesk ext: 1234 | help@railway.gov.in
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
