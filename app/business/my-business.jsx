import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import BusinessCard from "./../../components/Explore/BusinessCard";
import { db } from "../../firebaseInit";
import { useNavigation } from "expo-router";

export default function MyBusiness() {
  const { user } = useUser();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUserBusiness = async () => {
    setLoading(true);
    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const docs = await getDocs(q);
    const list = [];
    docs.forEach((doc) => {
      list.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setBusinessList(list);
    setLoading(false);
  };
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitleVisible: false,
      headerTitle: "My Businesses",
    });
    getUserBusiness();
  }, []);
  return (
    <View style={{ padding: 20 }}>
      
      <FlatList
        data={businessList}
        onRefresh={getUserBusiness}
        refreshing={loading}
        renderItem={({ item }) => <BusinessCard business={item} />}
      />
    </View>
  );
}
