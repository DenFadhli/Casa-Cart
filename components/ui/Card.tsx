import type { PropsWithChildren } from "react";
import { View } from "react-native";

import { cn } from "@/utils/cn";

export const Card = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <View
    className={cn(
      "rounded-[32px] border border-white/60 bg-[#fffdf9] p-5",
      className,
    )}
    style={{
      shadowColor: "#4f3422",
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 16 },
      shadowRadius: 32,
      elevation: 4,
    }}
  >
    {children}
  </View>
);
