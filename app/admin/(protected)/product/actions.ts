"use server";

import { writeData } from "@/lib/data";
import type { ProductData } from "@/lib/types";

export async function saveProduct(data: ProductData): Promise<{ success: boolean; error?: string }> {
  try {
    writeData("product.json", data);
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
