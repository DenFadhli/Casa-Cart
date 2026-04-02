import type { ReactNode } from "react";
import { Text, View } from "react-native";

interface HeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
}

export const Header = ({
  eyebrow,
  title,
  subtitle,
  rightSlot,
}: HeaderProps) => (
  <View className="flex-row items-center justify-between gap-4 py-2">
    <View className="flex-1 gap-1.5">
      {eyebrow ? (
        <Text className="text-[11px] font-bold uppercase tracking-[3px] text-[#9a5b3d]">
          {eyebrow}
        </Text>
      ) : null}
      <Text className="text-[32px] font-extrabold tracking-[-0.5px] text-[#2d241f]">{title}</Text>
      {subtitle ? (
        <Text className="text-[15px] leading-6 text-[#74655b]">{subtitle}</Text>
      ) : null}
    </View>
    {rightSlot}
  </View>
);
