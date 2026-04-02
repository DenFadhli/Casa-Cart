import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

export const SearchBar = ({
  value,
  onChangeText,
  placeholder,
}: SearchBarProps) => (
  <View className="flex-row items-center gap-3 rounded-full bg-[#f3ebe1] px-5 py-4 min-h-[56px]">
    <Ionicons name="search" size={20} color="#a28671" />
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#a28671"
      className="flex-1 text-base text-[#2d241f]"
      selectionColor="#9a5b3d"
    />
  </View>
);
