import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function LoginScreen() {
  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Image
          source={require("./../assets/images/react-logo.png")}
          style={{
            width: 250,
            height: 450,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#000",
          }}
        />
      </View>
      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Your Ultimate{" "}
          <Text
            style={{
              color: Colors.PRIMARY,
            }}
          >
            Urban company
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "outfit",
            textAlign: "center",
            marginVertical: 15,
            color: Colors.GRAY,
          }}
        >
          Find your favorite business near you and post your own busuiness to
          your community
        </Text>
        <TouchableOpacity style={styles.btn}>
          <Link href="/sign-in">
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontFamily: "outfit",
              }}
            >
              Sign In
            </Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { marginTop: 10 }]}>
          <Link href="/sign-up">
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontFamily: "outfit",
              }}
            >
              Sign Up
            </Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -20,
    // elevation:1
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
  },
});
