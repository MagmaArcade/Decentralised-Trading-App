/*
Name:   Nathan Hoorbkaht
		    Nicholas Gustin	
		    Connor Lack

SID:	  103865794
		    103995882
		    103992223
*/
// this is the Dashboard page. this page is view coin market history, including options to buy and sell.

import "../css/Dashboard.css"

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