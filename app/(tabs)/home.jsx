import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Categroy from "../../components/Home/Categroy";
import PopularBusiness from "../../components/Home/PopularBusiness";
import Slider from "../../components/Home/Slider";
import Header from "./../../components/Home/Header";

const home = () => {
  return (
    <ScrollView>
      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider />
      {/* Category */}
      <Categroy />
      {/* Popular business list */}
      <PopularBusiness />
    </ScrollView>
  );
};

export default home;

const styles = StyleSheet.create({});
