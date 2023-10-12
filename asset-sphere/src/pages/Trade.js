/*
Name:   Nathan Hoorbkaht
		    Nicholas Gustin	
		    Connor Lack

SID:	  103865794
		    103995882
		    103992223
*/
// this is the trade page. this page is view asset market history, including options to buy and sell.

import "../css/Trade.css"; // import css styling
import CoinStatistics from '../assets/CoinStatistics.png'; // import images

// Trade application
function Trade() {
  return (
    <div className="trade">
      <div className="trade-main-container">
        <div className="trade-left-container">
          <div className="trade-top">
            <p>
              <span className="trade-asset-text">Swincoin</span> {/* asset name */}        
              <span className="trade-btc-text">SWN</span> {/* asset code */}
            </p>
            <button>Change Asset</button> {/* will open up a list of coins the user can get more details for */}
          </div>
          <div className="trade-middle">
            <p>
              <span className="trade-asset-value">$36,021.65</span> <span className="trade-currency">AUD</span> {/* value of 1 volume of the asset */}
            </p>
          </div>
          <div className="statistics">
            <p>Description, etc.</p>
          </div>
        </div>
        <div className="trade-right-container">
          <h1>Trade Currency</h1>
          <div>
            <label className="trade-label" htmlFor="trade-amount">Amount</label>
          </div>
          <div className="trade-input-container">
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder=""
            />
            <label className="trade-dollar-label">$</label>
          </div>
          <div className="file-upload">
            <input type="file" id="fileInput" />
            <label htmlFor="fileInput" className="file-label">UPLOAD SMART CONTRACT</label>
          </div>
          <div>
            <button className="trade-purchase-btn">TRADE</button>
          </div>
        </div>
      </div>
    </div>
);
}
export default Trade;
