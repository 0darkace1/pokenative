import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import React, { useEffect } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import Row from "@/components/Row";
import ThemedText from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = ViewProps & {
  color: string;
  name: string;
  value: number;
};

function statShortName(name: string): string {
  return name
    .replaceAll("special", "S")
    .replaceAll("-", "")
    .replaceAll("attack", "ATK")
    .replaceAll("defense", "DEF")
    .replaceAll("speed", "SPD")
    .toUpperCase();
}

const PokemonStat = ({ style, color, name, value, ...rest }: Props) => {
  const colors = useThemeColors();
  const sharedValue = useSharedValue(value);

  const barInnerStyle = useAnimatedStyle(() => {
    return {
      flex: sharedValue.value,
    };
  });
  const barBackgroundStyle = useAnimatedStyle(() => {
    return {
      flex: 255 - sharedValue.value,
    };
  });

  useEffect(() => {
    sharedValue.value = withSpring(value);
  }, [value]);

  return (
    <Row gap={8} style={[style, styles.root]} {...rest}>
      <View style={[styles.name, { borderColor: colors.grayLight }]}>
        <ThemedText variant="subtitle3" style={{ color: color }}>
          {statShortName(name)}
        </ThemedText>
      </View>

      <View style={styles.value}>
        <ThemedText>{value.toString().padStart(3, "0")}</ThemedText>
      </View>

      <Row style={styles.bar}>
        <Animated.View
          style={[styles.barInner, barInnerStyle, { backgroundColor: color }]}
        />
        <Animated.View
          style={[
            styles.barBackground,
            barBackgroundStyle,
            { backgroundColor: color },
          ]}
        />
      </Row>
    </Row>
  );
};

export default PokemonStat;

const styles = StyleSheet.create({
  root: {},
  name: {
    width: 50,
    paddingRight: 8,
    borderRightWidth: 1,
    borderStyle: "solid",
  },
  value: {
    width: 23,
  },
  bar: {
    flex: 1,
    borderRadius: 20,
    height: 4,
    overflow: "hidden",
  },
  barInner: {
    height: 4,
  },
  barBackground: {
    height: 4,
    opacity: 0.24,
  },
});
