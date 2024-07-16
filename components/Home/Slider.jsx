import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { db } from "../../firebaseInit";
import { useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";

export default function Slider() {
  useEffect(() => {
    getSliderList();
  }, []);
  const [sliderList, setSliderList] = useState([]);
  const getSliderList = async () => {
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);
    const sliders = [];
    querySnapshot.forEach((doc) => {
      sliders.push({ id: doc?.id, ...doc.data() });
    });
    setSliderList(sliders);
  };
  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          padding: 20,
          paddingLeft: 20,
          paddingTop: 20,
          marginBottom: 5,
        }}
      >
        #Special for you
      </Text>
      <FlatList
        data={sliderList}
        style={{ paddingLeft: 20 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: 300,
              height: 150,
              borderRadius: 15,
              marginRight: 15,
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
