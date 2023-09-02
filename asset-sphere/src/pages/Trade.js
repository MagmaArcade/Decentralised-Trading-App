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
    <div className="Trade">
      <div className="main__container">
        <div className="left__container">
          <div className="Trade__Top">
            <p>
              <span className="bitcoin__text">Bitcoin</span> <span className="btc__text">BTC</span>
            </p>
            <button>Change Coin</button>
          </div>
          <div className="Trade__Middle">
            <p>
              <span className="coin__value">$36,021.65</span> <span className="currency">AUD</span>
            </p>
          </div>
          <div className="Trade__Low">
            <div className="date__btns__gap">
              <button className="date__btn">1D</button>
              <button className="date__btn">1W</button>
              <button className="date__btn">1M</button>
              <button className="date__btn">1Y</button>
            </div>
          </div>
          <div className="Statistics">
            <img src={CoinStatistics} alt="Stats" className="CoinStatistics"/>
          </div>
        </div>
        <div className="right__container">
          <h1>Trade Currency</h1>
          <div className="button__row">
            <button className="main__btn">BUY</button>
            <button className="main__btn">SELL</button>
          </div>
          <div>
            <label className="label" htmlFor="amount">Amount</label>
          </div>
          <div className="input__container">
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder=""
            />
            <label className="dollar-label">$</label>
          </div>
          <div>
            <button className="purchase__btn">PURCHASE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trade;
