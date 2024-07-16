import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function BusinessListCard({ business }) {
  const { imageUrl, name, address, id } = business;
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
      onPress={() => router.push(`/businessdetail/${id}`)}
    >
      <Image
        source={{ uri: imageUrl }}
        style={{ width: 120, height: 120, borderRadius: 15 }}
      />

      <View style={{ flex: 1, gap: 7 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>{name}</Text>
        <Text
          style={{ fontFamily: "outfit", color: Colors.GRAY, fontSize: 15 }}
        >
          {address}
        </Text>
        <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
          <Image
            source={require("../../assets/images/star.png")}
            style={{
              width: 15,
              height: 15,
            }}
          />
          <Text
            style={{
              fontFamily: "outfit",
            }}
          >
            4.5
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
