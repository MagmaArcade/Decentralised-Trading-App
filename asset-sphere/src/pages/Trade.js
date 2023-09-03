/*
Name:   Nathan Hoorbkaht
		    Nicholas Gustin	
		    Connor Lack

SID:	  103865794
		    103995882
		    103992223
*/
// this is the trade page. this page is view asset market history, including options to buy and sell.

import React from "react";
import { Link } from "react-router-dom"; // import Link from react-router-dom
import "../css/Trade.css";
import CoinStatistics from '../assets/CoinStatistics.png'; // import images

function Trade() {
  return (
    <div className="trade">
      <div className="trade-main-container">
        <div className="trade-left-container">
          <div className="trade-top">
            <p>
              <span className="trade-asset-text">Swincoin</span>              
              <span className="trade-btc-text">SWN</span>
            </p>
            <button>Change Asset</button>
          </div>
          <div className="trade-Middle">
            <p>
              <span className="trade-asset-value">$36,021.65</span> <span className="trade-currency">AUD</span>
            </p>
          </div>
          <div className="trade-Low">
            <div className="date-btns-gap">
              <button className="date-btn">1D</button>
              <button className="date-btn">1W</button>
              <button className="date-btn">1M</button>
              <button className="date-btn">1Y</button>
            </div>
          </div>
          <div className="Statistics">
            <img src={CoinStatistics} alt="Stats" className="CoinStatistics"/>
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
