import React from "react";
import { getAPiUrl } from "../config";
import { ProductComponent } from "./ProductComponent";
import { ProductState, Product } from "../productTypes";

export class ProductsContainer extends React.Component<{}, ProductState> {
  constructor(props?: any) {
    super(props);
    this.state = {
      products: []
    };

    this.deleteProduct = this.deleteProduct.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  private fetchProducts() {
    fetch(getAPiUrl())
      .then((data) => data.json())
      .then((data) => {
        this.setState({ products: data.products });
      });
  }

  deleteProduct(pid: string): void {
    fetch(`${getAPiUrl()}/${pid}`, { method: "DELETE" }).then(
      this.fetchProducts
    );
  }

  render() {
    return this.state?.products ? (
      <div className="container">
        <h3> Products </h3>
        <div className="d-flex p-2">
          {this.state?.products?.map((prod: Product) => (
            <ProductComponent
              key={prod.pid}
              {...prod}
              deleteProduct={this.deleteProduct}
            />
          ))}
        </div>
      </div>
    ) : (
      <div> Loading...</div>
    );
  }
}
