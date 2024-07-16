import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function MenuList() {
  const router = useRouter();
  const { signOut } = useAuth();
  function onPressHandle(item) {
    const path = item.path;
    if (path === "logout") {
      signOut();
      return;
    }
    if (path === "share") {
      return Share.share({
        message: "Download the shopify",
      });
    }

    router.push(item.path);
  }
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("../../assets/images/add.png"),
      path: "/business/add-business",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("../../assets/images/business-and-trade.png"),
      path: "/business/my-business",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("../../assets/images/share_1.png"),
      path: "share",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("../../assets/images/logout.png"),
      path: "logout",
    },
  ];
  return (
    <View style={{ marginTop: 50 }}>
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPressHandle(item)}
            key={item.id}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              padding: 10,
              borderRadius: 15,
              borderWidth: 1,
              margin: 10,
              backgroundColor: "#fff",
              borderColor: Colors.PRIMARY,
            }}
          >
            <Image
              source={item.icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-md",
                fontSize: 16,
                flex: 1,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Text
        style={{
          fontFamily: "outfit",
          marginTop: 50,
          textAlign: "center",
          color: Colors.GRAY,
        }}
      >
        Developed by Mohammed sinan @ 2024
      </Text>
    </View>
  );
}
