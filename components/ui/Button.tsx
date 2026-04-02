import type { ReactNode } from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

import { colors } from "@/constants/colors";
import { cn } from "@/utils/cn";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  className?: string;
}

const styles = {
  primary: {
    container: "bg-[#9a5b3d] border-[#9a5b3d]",
    text: "text-white",
    spinner: "#ffffff",
  },
  secondary: {
    container: "bg-[#efe1d2] border-[#e7d7c7]",
    text: "text-[#4f3422]",
    spinner: colors.primary,
  },
  ghost: {
    container: "bg-transparent border-transparent",
    text: "text-[#9a5b3d]",
    spinner: colors.primary,
  },
};

export const Button = ({
  label,
  onPress,
  variant = "primary",
  disabled,
  loading,
  icon,
  className,
}: ButtonProps) => {
  const selected = styles[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={cn(
        "min-h-12 flex-row items-center justify-center rounded-full border px-4 py-3",
        "active:scale-95 active:opacity-90 transition-all duration-200",
        selected.container,
        disabled ? "opacity-50" : "opacity-100",
        className,
      )}
    >
      {loading ? (
        <ActivityIndicator color={selected.spinner} />
      ) : (
        <>
          {icon}
          <Text className={cn("text-[13px] font-bold tracking-wide", selected.text)}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
};
