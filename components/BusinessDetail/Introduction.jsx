import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Introduction({ business }) {
  const router = useRouter();
  return (
    <View>
      <StatusBar hidden={true} />
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 20,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Pressed")}>
          <Ionicons name="heart-outline" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: business?.imageUrl }}
        style={{
          width: "100%",
          height: 340,
        }}
      />
      <View
        style={{
          padding: 20,
          marginTop: -20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontFamily: "outfit-bold",
          }}
        >
          {business?.name}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "outfit",
          }}
        >
          {business?.address}
        </Text>
      </View>
    </View>
  );
}
