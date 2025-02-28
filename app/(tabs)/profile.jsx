import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import UserIntro from "../../components/Profile/UserIntro";
import { useNavigation } from "expo-router";
import MenuList from "../../components/Profile/MenuList";

const profile = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitleVisible: false,
      headerTitle: "Profile",
    });
  });
  return (
    <View style={{ padding: 20 }}>
      {/* user info */}
      <UserIntro />
      {/* Action buttons */}
      <MenuList />
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
