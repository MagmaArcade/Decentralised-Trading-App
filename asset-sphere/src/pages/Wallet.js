/*
Name:   Nathan Hoorbkaht
		    Nicholas Gustin	
		    Connor Lack

SID:	  103865794
		    103995882
		    103992223
*/
// this is the Register page. this page is used view a users owned coins.

import { Grid } from "@mui/material"; // import js elements from mui
import "../css/Wallet.css"; // import css styling

// Wallet application
function Wallet() {
  return (
    <div className="Wallet">
      <Grid id="wallet-id-container"
        direction="row"
        justifyContent="center"
        alignItems="center"
        container spacing={2}>

        <Grid item xs={3}>
          <item> 
            <p>Wallet ID: 000012</p>
          </item>
        </Grid>

        <Grid item xs={4}><noscript>This is a spacer for the grid</noscript></Grid> {/* space add an empty grid element that consume the empty grid spaces */}

        <Grid item xs={2}>
          <item> 
            <button className="wallet-trade_btn">Deposit</button>
          </item>
        </Grid>

        <Grid item xs={2}>
          <item> 
            <button className="wallet-trade_btn">Withdrawl</button>
          </item>
        </Grid>
      </Grid>

      <div className="wallet-main-container">
        <div className="wallet-left-container">
          <h1> Trade History </h1>
        </div>

        <div className="wallet-right-container">
          <h1> Current Funds </h1>
          <div className="wallet-input-container">
            <div>
              <label htmlFor="coin1">Coin 1</label>
            </div>
            <div>
              <label htmlFor="coin2">Coin 2</label>
            </div>
            <div>
              <label htmlFor="coin3">Coin 3</label>
            </div>
            
            </div>
        </div>
      </div>`
  </div>
);
}

export default Wallet;