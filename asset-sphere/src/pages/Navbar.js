import { Grid } from "@mui/material";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";


import logo from '../assets/AssetSphere_Logo.png';
import profile from '../assets/1.jpg';



function App() {
  return (
    <div className="App">
        <Grid 
			container
			direction="row"
			justifyContent="center"
			alignItems="center"
  
		container rowSpacing={1}>
	
	
			
		<Grid item xs={3}>
			<item> <img
				src={logo}
				alt={"Home"}
				align="left"
				style={{ width: 200, height: 50 }}
			/></item>
		</Grid>
		<Grid item xs={1.5}>
			<item>
				<Link to="/Market"> Market </Link>
			</item>
		</Grid>
		<Grid item xs={1.5}>
			<item>
				<Link to="/Dashboard"> Dashboard </Link>
			</item>		</Grid>
		<Grid item xs={1.5}>
			<item>
				<Link to="/Wallet"> Wallet </Link>
			</item>
		</Grid>
		<Grid item xs={3}>
			<item> <img
				src={profile}
				alt={"Login"}	
				align="right"	
				style={{ width: 50, height: 50 }}				
			/></item>
		</Grid>
</Grid>






    </div>
  );
}

export default App; 

