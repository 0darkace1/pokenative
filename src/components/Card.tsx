import { Shadows } from "@/constants/Shadows";
import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps & {};

const Card = ({ style, ...rest }: Props) => {
  const colors = useThemeColors();

  return (
    <View
      style={[
        style,
        styles.cardContainer,
        { backgroundColor: colors.grayWhite },
      ]}
      {...rest}
    />
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    overflow: "hidden",
    ...Shadows.dp2,
  },
});
