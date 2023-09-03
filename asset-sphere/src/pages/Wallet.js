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
          <h1> Transaction History </h1>
          <div>
          <table className="wallet-table">
            <tr>
              <th>Date / Time</th>
              <th>Asset</th>
              <th>Amount</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>19/08/2023 10:15am</td>
              <td>SwinCoin</td>
              <td>0.20</td>
              <td>$500.00 AUD</td>
            </tr>
            <tr>
              <td>19/08/2023 10:15am</td>
              <td>SwinCoin</td>
              <td>0.30</td>
              <td>$4300.00 AUD</td>
            </tr>
            <tr>
              <td>19/08/2023 10:10am</td>
              <td>SwinCoin</td>
              <td>4.20</td>
              <td>$530.00 AUD</td>
            </tr>
            <tr>
              <td>19/08/2023 10:32am</td>
              <td>SwinCoin</td>
              <td>13.20</td>
              <td>$120.00 AUD</td>
            </tr>
            <tr>
              <td>19/08/2023 10:43am</td>
              <td>SwinCoin</td>
              <td>51.20</td>
              <td>$60.00 AUD</td>
            </tr>
            <tr>
              <td>19/08/2023 10:12am</td>
              <td>SwinCoin</td>
              <td>3.20</td>
              <td>$900.00 AUD</td>
            </tr>
            <tr>
              <td>19/08/2023 10:34am</td>
              <td>SwinCoin</td>
              <td>23.20</td>
              <td>$522.00 AUD</td>
            </tr>
            <tr>
              <td>19/08/2023 10:11am</td>
              <td>SwinCoin</td>
              <td>34.20</td>
              <td>$983.00 AUD</td>
            </tr>
            <tr>
              <td>19/08/2023 10:36am</td>
              <td>SwinCoin</td>
              <td>11.20</td>
              <td>$32.00 AUD</td>
            </tr>
            <tr>
              <td>19/08/2023 10:32am</td>
              <td>SwinCoin</td>
              <td>92.20</td>
              <td>$433.00 AUD</td>
            </tr>
            <tr>
              <td>19/08/2023 10:31am</td>
              <td>SwinCoin</td>
              <td>2.20</td>
              <td>$86.00 AUD</td>
            </tr>
          </table>
          </div>
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