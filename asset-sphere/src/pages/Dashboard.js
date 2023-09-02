import "../css/Dashboard.css"
import { Grid } from "@mui/material";

function Dashboard() {
  return (
    <div className="Dashboard">
      <Grid id="dashboardLayout"
        direction="row"
        justifyContent="left"
        alignItems="center"
        container spacing={1}>
        
        <Grid item xs={12}>
          <item>
              <h2 className="sectionHeadings">My Portfolio</h2>
          </item>
        </Grid>

        <Grid item xs={12}>
          <item>
            <div id="Summary">

            </div>
          </item>
        </Grid>

        <Grid item xs={2}>
          <item>
            <div className="smallData">
              <p>Account Balance</p>
            </div>
          </item>
        </Grid>
        <Grid item xs={2}>
          <item>
            <div className="smallData">
              <p>Portfolio value</p>
            </div>
          </item>
        </Grid>
        <Grid item xs={2}>
          <item>
            <div className="smallData">
              <p>???</p>
            </div>
          </item>
        </Grid>
        <Grid item xs={1}><noscript>This is a spacer for the grid</noscript></Grid>
        <Grid item xs={3}>
          <item>
            <div id="largeData">
              <p>Pie chart showing asset summary</p>
            </div>
          </item>
        </Grid>
        <Grid item xs={1}><noscript>This is a spacer for the grid</noscript></Grid>

      </Grid>
    </div>
);
}

export default Dashboard;