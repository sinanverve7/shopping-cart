import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { deleteDoc, doc } from "firebase/firestore";
import Toast from "react-native-simple-toast";
import React from "react";
import {
  Alert,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";

export default function Introduction({ business }) {
  const router = useRouter();
  const { user } = useUser();
  const deleteBusiness = async () => {
    console.log("====================================");
    await deleteDoc(doc(db, "BusinessList", business?.id));
    router.back();
    Toast.show("Business Deleted!", Toast.LONG);
  };
  const onDelete = async () => {
    Alert.alert(
      "Do you want to Delete?",
      "Are you sure this cannot be reversed!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteBusiness(),
        },
      ]
    );
  };
  const myBusiness =
    user?.primaryEmailAddress?.emailAddress == business?.userEmail;
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
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
          {myBusiness && (
            <Pressable onPress={onDelete}>
              <Ionicons name="trash" size={24} color="red" />
            </Pressable>
          )}
        </View>
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
