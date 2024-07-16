import { useUser } from "@clerk/clerk-expo";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Toast from "react-native-simple-toast";
import { Colors } from "../../constants/Colors";
import { db, storage } from "../../firebaseInit";

export default function AddBusiness() {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const getCategoryList = async () => {
    const q = query(collection(db, "Category"));
    const docs = await getDocs(q);
    const list = [];
    docs.forEach((doc) => {
      list.push({ id: doc.id, label: doc.data().name, value: doc.data().name });
    });
    console.log("categories ", list);
    setCategoryList(list);
  };
  useEffect(() => {
    getCategoryList();
  }, []);

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const navigation = useNavigation();
  const numberOfLines = 5;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
      headerBackTitleVisible: false,
    });
  }, []);
  const onImagePick = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const onAdd = async () => {
    try {
      setLoading(true);
      const fileName = Date.now().toString() + image.split("/").pop();
      console.log("filename is 💥💥💥💥", fileName);
      // const fileType = fileName.split(".").pop();
      const resp = await fetch(image);
      const blob = await resp.blob();
      const storageRef = ref(storage, "business-app/" + fileName);
      console.log("uploading image");
      const uploadTask = uploadBytesResumable(storageRef, blob);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          setLoading(false);
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              console.log("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              console.log("User canceled the upload");
              break;
            case "storage/unknown":
              console.log(
                "Unknown error occurred, inspect error.serverResponse"
              );
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          console.log("file upload completed 😀😀😀");
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            //perform your task
            saveBusinessDetails(downloadURL);
          });
        }
      );
    } catch (error) {
      console.log("error ==>", error);
      setLoading(false);
    }
  };
  const saveBusinessDetails = async (imageUrl) => {
    try {
      const body = JSON.parse(
        JSON.stringify({
          name,
          address,
          contact,
          website,
          about,
          category,
          imageUrl,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userImage: user?.imageUrl,
        })
      );
      const docRef = await addDoc(collection(db, "BusinessList"), body);
      Toast.show("Business added...", Toast.BOTTOM);
    } catch (error) {
      console.log("error happened ==>", error);
    } finally {
      setLoading(false);
    }
  };
  const placeholder = {
    label: "Select a Category...",
    value: null,
    color: "#9EA0A4",
  };
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
        Add New Business
      </Text>
      <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
        Fill all the details in order to add new business
      </Text>
      <Pressable style={{ marginTop: 20 }} onPress={onImagePick}>
        {!image ? (
          <Image
            source={require("../../assets/images/placeholder.png")}
            style={{ width: 100, height: 100 }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 15 }}
          />
        )}
      </Pressable>
      <View>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="Contact"
          value={contact}
          onChangeText={(text) => setContact(text)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="Website"
          value={website}
          onChangeText={(text) => setWebsite(text)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="About"
          value={about}
          onChangeText={(text) => setAbout(text)}
          editable
          multiline
          numberOfLines={Platform.OS === "ios" ? null : numberOfLines}
          minHeight={
            Platform.OS === "ios" && numberOfLines ? 20 * numberOfLines : null
          }
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            padding: 10,
          }}
        >
          <RNPickerSelect
            placeholder={placeholder}
            value={category}
            onValueChange={(value) => setCategory(value)}
            items={categoryList}
          />
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
      ) : (
        <Pressable
          onPress={onAdd}
          style={{
            padding: 10,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 15,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-md",
              color: "#fff",
            }}
          >
            Add New Business
          </Text>
        </Pressable>
      )}
    </View>
  );
}
