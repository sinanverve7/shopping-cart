import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import Categroy from "../../components/Home/Categroy";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseInit";
import ExploreBusiness from "../../components/Explore/ExploreBusiness";

const explore = () => {
  const [businessList, setBusinessList] = useState([]);
  const onCategorySelect = async (category) => {
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const docs = await getDocs(q);
    const list = [];
    docs.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    setBusinessList(list);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>
        Explore More
      </Text>
      {/* Search bar */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          padding: 10,
          backgroundColor: "#fff",
          marginTop: 15,
          borderRadius: 8,
          marginVertical: 10,
          borderColor: Colors.PRIMARY,
          borderWidth: 1,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{
            fontFamily: "outfit",
            fontSize: 16,
          }}
        />
      </View>
      {/* Category */}
      <Categroy explore={true} onCategorySelect={onCategorySelect} />
      {/* Business list */}
      <ExploreBusiness businessList={businessList} />
    </View>
  );
};

export default explore;

const styles = StyleSheet.create({});
