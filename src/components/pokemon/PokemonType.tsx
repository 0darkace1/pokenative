import { StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import ThemedText from "../ThemedText";

type Props = {
  name: keyof (typeof Colors)["type"];
};

const PokemonType = ({ name }: Props) => {
  return (
    <View style={[styles.root, { backgroundColor: Colors.type[name] }]}>
      <ThemedText color="grayWhite" variant="subtitle3" capitalize>
        {name}
      </ThemedText>
    </View>
  );
};

export default PokemonType;

const styles = StyleSheet.create({
  root: {
    flex: 0,
    height: 20,
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: "center",
  },
});
