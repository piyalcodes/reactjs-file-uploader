import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";

type Files = {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
};

export function FileListPage() {
  const [products, setProducts] = useState([]);
  const data = [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "10001",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
  ];

  useEffect(() => {
    //ProductService.getProductsMini().then((data) => setProducts(data));
  }, []);

  const fileDetails = () => {
    return <div>sdsdsds</div>;
  };

  const footer = `In total there are ${products ? products.length : 0} products.`;

  return (
    <div className="card">
      <DataTable
        value={products}
        footer={footer}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="name" header="Name"></Column>
        <Column header="Details" body={fileDetails}></Column>
        <Column header="Status" body={fileDetails}></Column>
      </DataTable>
    </div>
  );
}
