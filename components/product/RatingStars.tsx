import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface RatingStarsProps {
  rate: number;
  count?: number;
}

export const RatingStars = ({ rate, count }: RatingStarsProps) => (
  <View className="flex-row items-center gap-2">
    <View className="flex-row items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= Math.round(rate) ? "star" : "star-outline"}
          size={14}
          color="#d08b36"
        />
      ))}
    </View>
    <Text className="text-xs font-medium text-[#74655b]">
      {rate.toFixed(1)}
      {typeof count === "number" ? ` · ${count}` : ""}
    </Text>
  </View>
);
