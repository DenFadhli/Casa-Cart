import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
}

export const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) => (
  <Card className="items-center gap-4 px-6 py-8">
    <View className="h-16 w-16 items-center justify-center rounded-full bg-[#efe1d2]">
      {icon}
    </View>
    <View className="gap-2">
      <Text className="text-center text-xl font-bold text-[#2d241f]">
        {title}
      </Text>
      <Text className="text-center text-sm leading-6 text-[#74655b]">
        {description}
      </Text>
    </View>
    {actionLabel ? <Button label={actionLabel} onPress={onAction} /> : null}
  </Card>
);
