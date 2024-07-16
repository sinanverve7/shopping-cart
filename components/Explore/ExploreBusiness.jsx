import { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import BusinessCard from "./BusinessCard";

export default function ExploreBusiness({ businessList }) {
  return (
    <ScrollView>
      <FlatList
        data={businessList}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <BusinessCard business={item} key={item.id} />}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
