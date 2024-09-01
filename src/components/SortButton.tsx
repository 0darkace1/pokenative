import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import ThemedText from "./ThemedText";
import Card from "./Card";
import Row from "./Row";
import Radio from "./Radio";
import { Shadows } from "@/constants/Shadows";

type Props = {
  value: "id" | "name";
  onChange: (value: "id" | "name") => void;
};

const options = [
  {
    label: "Number",
    value: "id",
  },
  {
    label: "Name",
    value: "name",
  },
] as const;

const SortButton = ({ value, onChange }: Props) => {
  const colors = useThemeColors();

  const buttonRef = useRef<View>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [position, setPosition] = useState<null | {
    top: number;
    right: number;
  }>(null);

  const onClose = () => {
    setIsModalVisible((value) => !value);
  };
  const onOpen = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({
        top: y + height,
        right: Dimensions.get("window").width - x - width,
      });

      setIsModalVisible((value) => !value);
    });
  };

  return (
    <>
      <Pressable onPress={onOpen}>
        <View
          ref={buttonRef}
          style={[styles.button, { backgroundColor: colors.grayWhite }]}
        >
          <Image
            source={
              value === "id"
                ? require("@/assets/images/number.png")
                : require("@/assets/images/alpha.png")
            }
            width={16}
            height={16}
          />
        </View>
      </Pressable>

      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={onClose}
        transparent
      >
        <Pressable style={styles.overlay} onPress={onClose}>
          <View
            style={[
              styles.popup,
              { backgroundColor: colors.tint, ...position },
            ]}
          >
            <ThemedText
              style={styles.title}
              variant="subtitle2"
              color="grayWhite"
            >
              Sort by:
            </ThemedText>

            <Card style={styles.card}>
              {options.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => onChange(option.value)}
                >
                  <Row gap={8}>
                    <Radio checked={option.value === value} />
                    <ThemedText>{option.label}</ThemedText>
                  </Row>
                </Pressable>
              ))}
            </Card>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default SortButton;

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 32,

    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  popup: {
    position: "absolute",
    width: 113,
    padding: 4,
    paddingTop: 12,
    gap: 16,
    borderRadius: 12,
    ...Shadows.dp2,
  },
  title: {
    paddingLeft: 20,
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
});
