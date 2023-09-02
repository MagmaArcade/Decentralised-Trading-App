/*
Name:   Nathan Hoorbkaht
		    Nicholas Gustin	
		    Connor Lack

SID:	  103865794
		    103995882
		    103992223
*/
// this is the Register page. this page is used view a users owned coins.

import "../css/Wallet.css"; // import css styling

function Wallet() {
  return (
    <div className="Wallet">
      <div className="top_container">
        <div className="wallet_id_container">
          <p> Wallet ID: xxxxxx </p>
        </div>
        <div className="button__row">
          <button className="main__btn">Deposit</button>
          <button className="main__btn">Withdrawl</button>
        </div>
      </div>

     <div className="main__container">
      <div className="left__container">
        <h1> Trade History </h1>
      </div>


      <div className="right__container">
        

        <h1> Current Funds </h1>
        
        <div className="input-container">
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
     </div>
  </div>
);
}

export default Wallet;