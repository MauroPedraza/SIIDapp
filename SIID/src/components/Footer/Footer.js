import React from "react";
import { Grid } from "semantic-ui-react";

import "./Footer.scss";

export default function Footer() {
  return (
    <div className="player">
      <Grid>
        <Grid.Column width={4} className="left"></Grid.Column>
        <Grid.Column width={8} className="center"></Grid.Column>
        <Grid.Column width={4} className="right"></Grid.Column>
      </Grid>
    </div>
  );
}
