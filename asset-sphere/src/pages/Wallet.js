/*
Name:   Nathan Hoorbkaht
		    Nicholas Gustin	
		    Connor Lack

SID:	  103865794
		    103995882
		    103992223
*/
// this is the Register page. this page is used view a users owned coins.

import { Grid } from "@mui/material";
import "../css/Wallet.css"; // import css styling

function Wallet() {
  return (
    <div className="wallet">
      <Grid id="wallet_id_container"
        direction="row"
        justifyContent="center"
        alignItems="center"
        container spacing={2}>

        <Grid item xs={3}>
          <item> 
            <p>Wallet ID: 000012</p>
          </item>
        </Grid>

        <Grid item xs={4}><noscript>This is a spacer for the grid</noscript></Grid>

        <Grid item xs={2}>
          <item> 
            <button className="trade_btn">Deposit</button>
          </item>
        </Grid>

        <Grid item xs={2}>
          <item> 
            <button className="trade_btn">Withdrawl</button>
          </item>
        </Grid>
      </Grid>

      <div className="main_container">
        <div className="left_container">
          <h1> Trade History </h1>
        </div>

        <div className="right_container">
          <h1> Current Funds </h1>
          <div className="input_container">
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