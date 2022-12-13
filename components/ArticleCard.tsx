import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { CardActionArea } from "@mui/material";

export default function ArticleCard({ image, title, subTitle }) {
  // console.log("title", title);
  // console.log("image", image);
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <Card
      sx={{
        // maxWidth: 345,
        height: "100% ",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100% ",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <Chip label="Crypto Basic" onClick={handleClick} />

        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {subTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
