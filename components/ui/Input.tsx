import type { TextInputProps } from "react-native";
import { Text, TextInput, View } from "react-native";

import { cn } from "@/utils/cn";

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const Input = ({ label, error, className, ...props }: InputProps) => (
  <View className="gap-2.5">
    <Text className="text-sm font-bold tracking-wide text-[#74655b]">{label}</Text>
    <TextInput
      placeholderTextColor="#a28671"
      className={cn(
        "min-h-[56px] rounded-[24px] px-5 py-4 text-base text-[#2d241f] border-2",
        error 
          ? "border-[#b34a3c]/30 bg-[#b34a3c]/5" 
          : "border-transparent bg-[#f3ebe1] focus:border-[#9a5b3d]/20 focus:bg-[#fffdf9]",
        className,
      )}
      {...props}
    />
    {error ? <Text className="text-sm font-medium text-[#b34a3c] ml-1">{error}</Text> : null}
  </View>
);
