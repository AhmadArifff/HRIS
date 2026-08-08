import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";

interface Product {
  id: string; 
  name: string; 
  category: string;
  sales: number;
  earnings: string;
  stocks: number;
  status: "In Stock" | "Low Stock";
  image: string; 
}

const tableData: Product[] = [
  {
    id: "#89345",
    name: "MacBook Pro 13”",
    category: "Laptop",
    sales: 1290,
    earnings: "$4,120",
    stocks: 450,
    status: "In Stock",
    image: "/images/product/product-01.jpg", 
  },
  {
    id: "#89346",
    name: "Apple Watch Ultra",
    category: "Watch",
    sales: 984,
    earnings: "$2,890",
    stocks: 12,
    status: "Low Stock",
    image: "/images/product/product-02.jpg", 
  },
  {
    id: "#89347",
    name: "iPhone 15 Pro Max",
    category: "SmartPhone",
    sales: 2432,
    earnings: "$6,890",
    stocks: 852,
    status: "In Stock",
    image: "/images/product/product-03.jpg", 
  },
  {
    id: "#89348",
    name: "iPad Pro 3rd Gen",
    category: "Electronics",
    sales: 850,
    earnings: "$1,890",
    stocks: 23,
    status: "Low Stock",
    image: "/images/product/product-04.jpg", 
  },
  {
    id: "#89349",
    name: "AirPods Pro 2nd Gen",
    category: "Accessories",
    sales: 3290,
    earnings: "$9,120",
    stocks: 1204,
    status: "In Stock",
    image: "/images/product/product-05.jpg", 
  },
];

export default function TopProducts() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Top Products
          </h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Product Name
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Product ID
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Sales
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Earnings
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Stocks
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((product) => (
              <TableRow key={product.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src={product.image}
                        className="h-[50px] w-[50px]"
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.id}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.sales}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.earnings}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.stocks}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      product.status === "In Stock"
                        ? "success"
                        : "error"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
