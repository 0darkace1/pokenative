import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import Card from "@/components/Card";
import ThemedText from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { getPokemonArtWork } from "@/utils/pokemon";

type Props = {
  style?: ViewStyle;
  id: number;
  name: string;
};

const PokemonCard = ({ style, id, name }: Props) => {
  const colors = useThemeColors();

  return (
    <Link href={{ pathname: "/pokemon/[id]", params: { id } }} asChild>
      <TouchableOpacity style={style}>
        <Card style={[styles.card]}>
          <ThemedText style={styles.id} variant="caption" color="grayMedium">
            #{id.toString().padStart(3, "0")}
          </ThemedText>

          <Image
            source={{
              uri: getPokemonArtWork(id),
            }}
            width={72}
            height={72}
          />

          <ThemedText capitalize>{name}</ThemedText>

          <View
            style={[styles.shadow, { backgroundColor: colors.grayLight }]}
          />
        </Card>
      </TouchableOpacity>
    </Link>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  card: {
    position: "relative",
    alignItems: "center",
    padding: 4,
    backgroundColor: "#F1F1F1",
  },
  id: {
    alignSelf: "flex-end",
  },
  shadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    borderRadius: 7,
    zIndex: -1,
  },
});
