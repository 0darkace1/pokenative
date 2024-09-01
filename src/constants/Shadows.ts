import { ViewStyle } from "react-native";

export const Shadows = {
  dp2: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
} satisfies Record<string, ViewStyle>;
