import { useQuery } from "@tanstack/react-query";

import { categoryService } from "@/services/categoryService";
import { productService } from "@/services/productService";
import { queryKeys } from "@/utils/queryKeys";

export const useProducts = (limit?: number) =>
  useQuery({
    queryKey: [...queryKeys.products, limit] as const,
    queryFn: () => productService.getAll(limit),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

export const useProduct = (id: number | null) =>
  useQuery({
    queryKey: id ? queryKeys.product(id) : ["products", "missing-id"],
    queryFn: () => productService.getById(id as number),
    enabled: typeof id === "number" && Number.isFinite(id),
    staleTime: 1000 * 60 * 5,
  });

export const useCategories = () =>
  useQuery({
    queryKey: queryKeys.categories,
    queryFn: categoryService.getAll,
    staleTime: 1000 * 60 * 30,
  });
