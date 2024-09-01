import {
  View,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import { router, useLocalSearchParams } from "expo-router";

import Row from "@/components/Row";
import Card from "@/components/Card";
import RootView from "@/components/RootView";
import ThemedText from "@/components/ThemedText";
import PokemonType from "@/components/pokemon/PokemonType";
import PokemonSpec from "@/components/pokemon/PokemonSpec";
import PokemonStat from "@/components/pokemon/PokemonStat";

import { Colors } from "@/constants/Colors";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import {
  basePokemonStats,
  formatSize,
  formatWeight,
  getPokemonArtWork,
} from "@/utils/pokemon";

const PokemonView = () => {
  const colors = useThemeColors();
  const params = useLocalSearchParams() as { id: string };
  const id = parseInt(params.id, 10);

  const { data: pokemon } = useFetchQuery("/pokemon/[id]", {
    id,
  });
  const { data: species } = useFetchQuery("/pokemon-species/[id]", {
    id,
  });

  const mainType = pokemon?.types?.[0].type.name;
  const colorType = mainType ? Colors.type[mainType] : colors.tint;
  const types = pokemon?.types ?? [];
  const bio = species?.flavor_text_entries
    ?.find(({ language }) => language.name === "en")
    ?.flavor_text.replaceAll("\n", ". ");
  const stats = pokemon?.stats ?? basePokemonStats;

  const handlePlayCry = async () => {
    let cry = pokemon?.cries.latest;
    if (!cry) {
      return;
    }

    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

    const { sound } = await Audio.Sound.createAsync(
      { uri: cry! },
      { shouldPlay: true }
    );

    await sound.playAsync();
  };

  const onPrevious = () => {
    router.replace({
      pathname: "/pokemon/[id]",
      params: { id: Math.max(id - 1, 1) },
    });
  };

  const onNext = () => {
    router.replace({
      pathname: "/pokemon/[id]",
      params: { id: Math.min(id + 1, 1302) },
    });
  };

  return (
    <RootView backgroundColor={colorType}>
      <View>
        <Image
          source={require("@/assets/images/pokeball_big.png")}
          style={styles.pokeball}
          height={208}
          width={208}
        />
        <Row style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Row gap={8}>
              <Image
                source={require("@/assets/images/arrow_back.png")}
                width={32}
                height={32}
              />

              <ThemedText variant="headline" color="grayWhite" capitalize>
                {pokemon?.name}
              </ThemedText>
            </Row>
          </Pressable>

          <ThemedText variant="subtitle1" color="grayWhite">
            #{id.toString().padStart(3, "0")}
          </ThemedText>
        </Row>

        <View style={styles.body}>
          <Row style={styles.imageRow}>
            <TouchableOpacity
              style={id === 1 && { opacity: 0 }}
              onPress={onPrevious}
            >
              <Image
                source={require("@/assets/images/chevron_left.png")}
                width={24}
                height={24}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePlayCry}>
              <Image
                style={styles.artwork}
                source={{
                  uri: getPokemonArtWork(id),
                }}
                width={200}
                height={200}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={onNext}>
              <Image
                style={id === 1302 && { opacity: 0 }}
                source={require("@/assets/images/chevron_right.png")}
                width={24}
                height={24}
              />
            </TouchableOpacity>
          </Row>

          <Card style={styles.card}>
            <Row gap={16} style={{ height: 20 }}>
              {types?.map((t) => (
                <PokemonType key={t.type.name} name={t.type.name} />
              ))}
            </Row>

            {/* About */}
            <ThemedText variant="subtitle1" style={{ color: colorType }}>
              About
            </ThemedText>
            <Row>
              <PokemonSpec
                style={{
                  borderStyle: "solid",
                  borderRightWidth: 1,
                  borderColor: colors.grayLight,
                }}
                title={formatWeight(pokemon?.weight!)}
                description="Weight"
                image={require("@/assets/images/weight.png")}
              />
              <PokemonSpec
                style={{
                  borderStyle: "solid",
                  borderRightWidth: 1,
                  borderColor: colors.grayLight,
                }}
                title={formatSize(pokemon?.height!)}
                description="Size"
                image={require("@/assets/images/size.png")}
              />
              <PokemonSpec
                title={pokemon?.moves
                  .slice(0, 2)
                  .map((m) => m.move.name)
                  .join("\n")}
                description="Moves"
              />
            </Row>
            <ThemedText>{bio}</ThemedText>

            {/* Stats */}
            <ThemedText variant="subtitle1" style={{ color: colorType }}>
              Base stats
            </ThemedText>
            <View style={{ alignSelf: "stretch" }}>
              {stats.map((stat) => (
                <PokemonStat
                  key={stat.stat.name}
                  name={stat.stat.name}
                  value={stat.base_stat}
                  color={colorType}
                />
              ))}
            </View>
          </Card>
        </View>
      </View>
    </RootView>
  );
};

export default PokemonView;

const styles = StyleSheet.create({
  header: {
    margin: 20,
    justifyContent: "space-between",
  },
  pokeball: {
    opacity: 1,
    position: "absolute",
    right: 8,
    top: 8,
  },
  imageRow: {
    position: "absolute",
    top: -140,
    zIndex: 2,
    justifyContent: "space-between",
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  artwork: {
    flex: 1,
  },
  body: {
    marginTop: 144,
  },
  card: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    gap: 16,
    alignItems: "center",
  },
});
