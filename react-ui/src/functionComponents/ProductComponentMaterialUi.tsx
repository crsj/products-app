import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";
import React from "react";
import { ProductProps } from "../productTypes";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 5
  },
  media: {
    height: 0,
    paddingTop: "70%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export const ProductComponentMaterialUi: React.FC<ProductProps> = ({
  pname,
  price,
  description,
  deleteProduct,
  pid
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`https://cataas.com/cat/says/${encodeURIComponent(pname)}`}
          title={pname}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {pname}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Price: {price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            deleteProduct(pid);
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
