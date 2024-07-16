import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View, ScrollView } from "react-native";
import Introduction from "../../components/BusinessDetail/Introduction";
import { Colors } from "../../constants/Colors";
import { db } from "../../firebaseInit";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";
import Reviews from "../../components/BusinessDetail/Reviews";

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState({});
  const [loading, setLoading] = useState(false);
  const getBusinessDetailById = async (id) => {
    setLoading(true);
    const docRef = doc(db, "BusinessList", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBusiness({ id: docSnap.id, ...docSnap.data() });
    } else {
    }
    setLoading(false);
  };
  useEffect(() => {
    getBusinessDetailById(businessid);
  }, []);
  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.PRIMARY}
          style={{ marginTop: "70%" }}
        />
      ) : (
        <View>
          {/* intro */}
          <Introduction business={business} />
          {/* Action buttons */}
          <ActionButton business={business} />

          {/* About sections  */}
          <About business={business} />
          {/* Reviews section */}
          <Reviews business={business} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
