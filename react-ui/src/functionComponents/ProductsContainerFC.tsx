import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getAPiUrl } from "../config";
import { ProductComponentMaterialUi } from "./ProductComponentMaterialUi";
import { Product, ProductState } from "../productTypes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  })
);

export const ProductsContainerFC: React.FC<ProductState> = () => {
  const classes = useStyles();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteProduct = (pid: string): void => {
    fetch(`${getAPiUrl()}/${pid}`, { method: "DELETE" }).then(() =>
      setIsLoading(true)
    );
  };

  const getProducts = () => {
    fetch(getAPiUrl())
      .then((data) => data.json())
      .then((data) => {
        setProducts(data.products);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, [isLoading]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {products.map((prod: Product) => (
          <Grid item xs={2}>
            <ProductComponentMaterialUi
              key={prod.pid}
              {...prod}
              deleteProduct={deleteProduct}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
