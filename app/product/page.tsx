import { readData } from "@/lib/data";
import type { ProductData } from "@/lib/types";
import ProductContent from "./ProductContent";

export default function ProductPage() {
  const data = readData<ProductData>("product.json");
  return <ProductContent data={data} />;
}
