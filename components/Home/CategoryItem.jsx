import { Image, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function CategoryItem({ category,onCategoryPress }) {
  return (
    <TouchableOpacity onPress={()=>onCategoryPress(category)}>
      <View
        style={{
          borderRadius: 99,
          marginRight: 15,
          padding: 15,
          backgroundColor: Colors.ICON_BG,
        }}
      >
        <Image
          source={{ uri: category.icon }}
          style={{ width: 40, height: 40 }}
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          fontFamily: "outfit-md",
          textAlign: "center",
          marginTop: 5,
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
