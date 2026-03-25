import { readData } from "@/lib/data";
import type { ProductData } from "@/lib/types";
import ProductForm from "./ProductForm";

export default function AdminProductPage() {
  const data = readData<ProductData>("product.json");
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black tracking-tight text-[#f0f0f0]">Product</h1>
        <p className="mt-1 text-sm text-[#d1d1d1]">제품 소개 관리</p>
      </div>
      <ProductForm initial={data} />
    </div>
  );
}
