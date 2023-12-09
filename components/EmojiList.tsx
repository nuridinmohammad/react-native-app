import { useState } from "react";
import { StyleSheet, FlatList, Image, Platform, Pressable, ImageSourcePropType } from "react-native";

export default function EmojiList({
  onSelect,
  onCloseModal,
}: {
  onSelect: (item:ImageSourcePropType) => void;
  onCloseModal: () => void;
}) {
  const [emoji] = useState([
    require("../assets/images/adaptive-icon.png"),
    require("../assets/images/favicon.png"),
    require("../assets/images/icon.png"),
    require("../assets/images/splash.png"),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => {
        return (
          <Pressable
            onPress={() => {
              onSelect(item);
              onCloseModal();
            }}
          >
            <Image source={item} key={index} style={styles.image} />
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
