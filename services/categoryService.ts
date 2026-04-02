import { api, fallbackApi } from "@/services/api";
import type { ProductCategory } from "@/types/product";

interface DummyJsonCategory {
  slug: string;
  name: string;
  url: string;
}

export const categoryService = {
  async getAll() {
    try {
      const response = await api.get<ProductCategory[]>("/products/categories");
      return response.data;
    } catch {
      const response = await fallbackApi.get<DummyJsonCategory[]>("/products/categories");
      return response.data.map((category) => category.slug);
    }
  },
};
