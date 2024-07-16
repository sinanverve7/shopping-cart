import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { db } from "./../../firebaseInit";
import { Colors } from "../../constants/Colors";

export default function BusinessListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitleVisible: false,
      headerTitle: category,
    });
    getBusinessList();
  }, []);
  const getBusinessList = async () => {
    setLoading(true);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const list = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      list.push({ id: doc?.id, ...doc.data() });
    });
    setBusinessList(list);
    setLoading(false);
  };
  return (
    <View>
      {businessList?.length > 0 && !loading ? (
        <FlatList
          onRefresh={loading}
          refreshing={getBusinessList}
          data={businessList}
          renderItem={({ item }) => <BusinessListCard business={item} />}
        />
      ) : loading ? (
        <ActivityIndicator
          style={{
            marginTop: "60%",
          }}
        />
      ) : (
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
            color: Colors.GRAY,
            textAlign: "center",
            marginTop: "50%",
          }}
        >
          No businesses found on this category
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
