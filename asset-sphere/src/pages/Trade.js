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
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../css/Trade.css"; //import "../css/Trade.css";

function Trade() {
  return (
  <div className="Trade">
     <div className="main__container">
      <div className="left__container">
        <h1>Hello</h1>
      </div>
      <div className="right__container">
        <h1>Trade Currency</h1>
        <div className="button__row">
          <button className="main__btn">BUY</button>
          <button className="main__btn">SELL</button>
        </div>
        <div className="input-container">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="$"
            />
          </div>
      </div>
      <div>

      </div>
     </div>
  </div>
  );
  }
  export default Trade;
