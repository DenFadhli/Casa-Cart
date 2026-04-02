import { api, fallbackApi } from "@/services/api";
import type { Product } from "@/types/product";

interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail?: string;
  images?: string[];
  reviews?: Array<{ rating: number }>;
}

interface DummyJsonProductListResponse {
  products: DummyJsonProduct[];
}

const mapDummyJsonProduct = (product: DummyJsonProduct): Product => ({
  id: product.id,
  title: product.title,
  description: product.description,
  category: product.category,
  price: product.price,
  image: product.thumbnail ?? product.images?.[0] ?? "",
  rating: {
    rate: product.rating,
    count: product.reviews?.length ?? product.stock ?? 0,
  },
});

export const productService = {
  async getAll(limit?: number) {
    try {
      const response = await api.get<Product[]>("/products", {
        params: limit ? { limit } : undefined,
      });

      return response.data;
    } catch {
      const response = await fallbackApi.get<DummyJsonProductListResponse>("/products", {
        params: limit ? { limit } : undefined,
      });

      return response.data.products.map(mapDummyJsonProduct);
    }
  },

  async getById(id: number) {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch {
      const response = await fallbackApi.get<DummyJsonProduct>(`/products/${id}`);
      return mapDummyJsonProduct(response.data);
    }
  },

  async getByCategory(category: string) {
    try {
      const response = await api.get<Product[]>(
        `/products/category/${encodeURIComponent(category)}`,
      );

      return response.data;
    } catch {
      const response = await fallbackApi.get<DummyJsonProductListResponse>(
        `/products/category/${encodeURIComponent(category)}`,
      );

      return response.data.products.map(mapDummyJsonProduct);
    }
  },
};
