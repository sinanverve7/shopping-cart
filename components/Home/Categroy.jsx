import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { db } from "../../firebaseInit";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

export default function Categroy({ explore = false, onCategorySelect }) {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  const getCategoryList = async () => {
    const q = query(collection(db, "Category"));
    const snapshot = await getDocs(q);
    const list = [];
    snapshot.forEach((doc) => {
      list.push({ id: doc?.id, ...doc.data() });
    });
    setCategoryList(list);
  };
  useEffect(() => {
    getCategoryList();
  }, []);
  const onCategoryPress = (category) => {
    if (explore) {
      onCategorySelect(category.name);
    } else {
      router.push("/businesslist/" + category.name);
    }
  };

  return (
    <View>
      {!explore && (
        <View
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "outfit-bold",
            }}
          >
            Categroy
          </Text>
          <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-md" }}>
            View All
          </Text>
        </View>
      )}
      <FlatList
        data={categoryList}
        horizontal={true}
        style={{ marginLeft: 20 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <CategoryItem
            category={item}
            key={item.id}
            onCategoryPress={onCategoryPress}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
