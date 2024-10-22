import { Column } from "react-table";

interface products {
    productName:String,
    productPrice:String,
    productQuantity:String,
}

export const COLUMNS: Column<products>[] = [

    {
        Header: "Product Name",
        accessor: "productName",
      },
      {
        Header: "Product price",
        accessor: "productPrice",
      },
      {
        Header: "Product Quantity",
        accessor: "productQuantity",
      },
]