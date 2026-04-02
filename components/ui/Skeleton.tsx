import { View } from "react-native";

import { cn } from "@/utils/cn";

export const Skeleton = ({ className }: { className?: string }) => (
  <View className={cn("overflow-hidden rounded-2xl bg-[#efe1d2]", className)} />
);
