import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../firebaseInit";
import BusinessCard from "./BusinessCard";

export default function PopularBusiness() {
  const [businessList, setBusinessList] = useState([]);

  const getBusinessList = async () => {
    const q = query(collection(db, "BusinessList"), limit(10));
    const snapshot = await getDocs(q);
    const list = [];
    snapshot.forEach((doc) => {
      list.push({ id: doc?.id, ...doc.data() });
    });
    setBusinessList(list);
  };

  useEffect(() => {
    getBusinessList();
  }, []);

  const onPressBusinessList = (category) => {};
  return (
    <View>
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          Popular Business
        </Text>
        <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-md" }}>
          View All
        </Text>
      </View>
      <FlatList
        data={businessList}
        horizontal={true}
        style={{ marginLeft: 20 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <BusinessCard business={item} key={item.id} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
