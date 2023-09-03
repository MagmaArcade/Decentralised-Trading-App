/*
Name:   Nathan Hoorbkaht
		    Nicholas Gustin	
		    Connor Lack

SID:	  103865794
		    103995882
		    103992223
*/
// this is the Trade page. this page is view coin market history, including options to buy and sell.

import React from "react";
import { Link } from "react-router-dom"; // import Link from react-router-dom
import "../css/Trade.css";
import CoinStatistics from '../assets/CoinStatistics.png'; // import images

function Trade() {
  return (
    <div className="trade">
      <div className="main_container">
        <div className="left_container">
          <div className="trade_top">
            <p>
              <span className="bitcoin_text">Bitcoin</span> <span className="btc_text">BTC</span>
            </p>
            <button className="trade_top_btn">Change Coin</button>
          </div>
          <div className="trade_middle">
            <p>
              <span className="coin_value">$36,021.65</span> <span className="currency">AUD</span>
            </p>
          </div>
          <div className="trade_low">
            <div className="date_btns_gap">
              <button className="date_btn">1D</button>
              <button className="date_btn">1W</button>
              <button className="date_btn">1M</button>
              <button className="date_btn">1Y</button>
            </div>
          </div>
          <div className="Statistics">
            <img src={CoinStatistics} alt="Stats" className="coin_statistics"/>
          </div>
        </div>
        <div className="right_container">
          <div className="right_container_header">
            <h1>Trade Currency</h1>
          </div>
          <div className="button_row">
            <button className="main_btn">BUY</button>
            <button className="main_btn">SELL</button>
          </div>
          <div>
            <label className="label" htmlFor="amount">Amount</label>
          </div>
          <div className="input_container">
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder=""
            />
            <label className="dollar_label">$</label>
          </div>
          <div>
            <button className="purchase_btn">PURCHASE</button>
          </div>
        </div>
      </div>
    </div>
);
}
export default Trade;
