import { useUser } from "@clerk/clerk-expo";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Rating } from "react-native-ratings";
import Toast from "react-native-simple-toast";
import { Colors } from "../../constants/Colors";
import { db } from "../../firebaseInit";

export default function Reviews({ business }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState("");
  const numberOfLines = 4;
  const { user } = useUser();
  const onSubmit = async () => {
    const docRef = doc(db, "BusinessList", business?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating,
        comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
      }),
    });
    const msg = "Comment Added Successfully";
    Toast.show(msg, Toast.BOTTOM);
    setUserInput("");
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#fff",
        marginTop: -50,
      }}
    >
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>Reviews</Text>
      <View>
        <Rating
          showRating={false}
          imageSize={20}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          placeholder="Write your comment"
          onChangeText={setUserInput}
          value={userInput}
          editable
          multiline
          numberOfLines={Platform.OS === "ios" ? null : numberOfLines}
          minHeight={
            Platform.OS === "ios" && numberOfLines ? 20 * numberOfLines : null
          }
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.GRAY,
            alignItems: "flex-start",
            textAlignVertical: "top",
          }}
        />
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 6,
            marginTop: 10,
          }}
          onPress={onSubmit}
        >
          <Text
            style={{ fontFamily: "outfit", color: "#fff", textAlign: "center" }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      {/* Previous reviews */}
      <View>
        {business?.reviews?.map((item, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              padding: 10,
              borderWidth: 1,
              borderColor: Colors.GRAY,
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Image
              source={{ uri: item.userImage }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 99,
              }}
            />
            <View style={{ display: "flex", gap: 5 }}>
              <Text style={{ fontFamily: "outfit-md" }}>
                {item.userName ? item.userName : "Anonymous"}
              </Text>
              <Rating
                imageSize={20}
                ratingCount={item.rating}
                style={{ alignItems: "flex-start" }}
              />
              <Text>{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
