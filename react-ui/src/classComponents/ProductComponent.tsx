import React from 'react';
import { ProductProps } from '../productTypes';

export const ProductComponent: React.FC<ProductProps> = ({ pname, price, deleteProduct, pid }) => (
  <div className="card" style={{ width: "18rem", marginLeft: "5px" }}>
    <div className="card-body">
      <h5 className="card-title">{pname}</h5>

      <h6 className="card-subtitle mb-2 text-muted">Price {price}</h6>

      <p className="card-text">Description for {pname}</p>
      <button type="button" className="btn btn-danger" onClick={ e => {e.preventDefault(); deleteProduct(pid);}}>X</button>
    </div>
  </div>
);
