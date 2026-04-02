import { Text, View } from "react-native";

import { cn } from "@/utils/cn";

interface BadgeProps {
  label: string;
  tone?: "info" | "success" | "warning" | "error";
}

const toneStyles = {
  info: "bg-[#efe1d2] text-[#4f3422]",
  success: "bg-[#d7eadc] text-[#2f5c46]",
  warning: "bg-[#f9e5c6] text-[#8d5a1c]",
  error: "bg-[#f7d7d1] text-[#8a3328]",
};

export const Badge = ({ label, tone = "info" }: BadgeProps) => (
  <View className="self-start rounded-full px-3 py-1">
    <Text className={cn("text-xs font-semibold", toneStyles[tone])}>
      {label}
    </Text>
  </View>
);
