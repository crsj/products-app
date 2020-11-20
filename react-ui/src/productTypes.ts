export type Product = {
  pid: string;
  pname: string;
  price: string;
  description: string;
};

export type ProductState = {
  products: Product[];
};

export type ProductActions = {
  deleteProduct: (pid: string) => void | undefined;
};

export type ProductProps = Product & ProductActions;
