import { StyleSheet, Text, View, ViewProps } from "react-native";

type Props = ViewProps & {
  gap?: number;
};

const Row = ({ style, gap, ...rest }: Props) => {
  return (
    <View
      style={[styles.row, style, gap ? { gap: gap } : undefined]}
      {...rest}
    />
  );
};

export default Row;

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
  },
});
