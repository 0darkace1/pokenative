import { Image, StyleSheet, Text, TextInput, View } from "react-native";

import Row from "./Row";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
  value: string;
  onChange: (s: string) => void;
};

const Searchbar = ({ value, onChange }: Props) => {
  const colors = useThemeColors();

  return (
    <Row
      style={[styles.wrapper, { backgroundColor: colors.grayWhite }]}
      gap={8}
    >
      <Image
        source={require("@/assets/images/search.png")}
        width={16}
        height={16}
      />
      <TextInput style={styles.input} onChangeText={onChange} value={value} />
    </Row>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 16,
    height: 32,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 16,
    fontSize: 10,
    lineHeight: 16,
  },
});
