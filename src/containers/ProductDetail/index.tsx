import React, { useEffect, useState } from 'react';
import { Product } from 'types';
// import 'styles.css';
import {
  useParams,
} from "react-router-dom";
import { ProductService } from 'services/API';

const productService = new ProductService();

export const ProductDetail = (): JSX.Element => {
  const {id = ''} = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  console.log("🚀 ~ file: index.tsx ~ line 25 ~ product", JSON.stringify(product))
  useEffect(() => {
    productService.show(Number(id)).then((response) => setProduct(response.data));
  },[id, setProduct]);
  
  return (
    <div>
      <h1>
        Product {id}
      </h1>
      {
        product && (
          <div>
            name: {product.attributes.name}
          </div>
        )
      }
    </div>
  );
};

export default ProductDetail;
