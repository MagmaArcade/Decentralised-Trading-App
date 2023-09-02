import "../css/Dashboard.css"
import { Grid } from "@mui/material";

function Dashboard() {
  return (
    <div className="Dashboard">
      <h2 className="sectionHeadings">My Portfolio</h2>
      
      <div id="Summary">
      </div>

      <div className="smallData">
        <p>Account Balance</p>
      </div>
      <div className="smallData">
        <p>Portfolio Value</p>
      </div>
      <div className="smallData">
        <p>?????</p>
      </div>

      <div className="smallData">
        <p>Pie chart of asset summary</p>
      </div>

      <h2 className="sectionHeadings">What's Hot</h2>
      <div id="Summary">
      </div>

    </div>
);
}

export default Dashboard;