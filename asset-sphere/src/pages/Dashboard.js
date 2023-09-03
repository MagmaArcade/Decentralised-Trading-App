/*
Name:   Nathan Hoorbkaht
		    Nicholas Gustin	
		    Connor Lack

SID:	  103865794
		    103995882
		    103992223
*/
// this is the Dashboard page. this page is view coin market history, including options to buy and sell.

import "../css/Dashboard.css" // import css styling

// Dashboard application
function Dashboard() {
  return (
    <div className="dashboard">
      <h2 className="section-headings">My Portfolio</h2>
      
      <div id="summary">
      </div>

      <div className="small-data">
        <p>Account Balance</p>
      </div>
      <div className="small-data">
        <p>Portfolio Value</p>
      </div>
      <div className="small-data">
        <p>Percentage Change</p>
      </div>

      <div className="small-data">
        <p>Pie chart of asset summary</p>
      </div>

      <h2 className="section-headings">What's Hot</h2>
      <div id="summary">
      </div>

    </div>
);
}

export default Dashboard;