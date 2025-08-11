import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import { settingsStyles as styles } from "../styles/settings.style";

const USER_STORAGE_KEY = "REGISTERED_USER";

const ProfileScreen = () => {
  const { user, setUser, logout } = useContext(AuthContext); // ✅ added logout
  const [isEditing, setIsEditing] = useState(false);

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = async () => {
    try {
      const updatedUser = {
        ...user,
        fullName,
        username,
        email,
      };

      // ✅ Update context
      setUser(updatedUser);

      // ✅ Save to AsyncStorage
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));

      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/user_icon.png")}
            style={styles.profileImage}
          />
        </View>

        {/* Display or Edit Fields */}
        <View>
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </>
          ) : (
            <>
              <View style={styles.info}>
                <Text style={styles.infoText}>Full Name:</Text>
                <Text style={styles.infoValue}>{fullName}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoText}>Username:</Text>
                <Text style={styles.infoValue}>{username}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoText}>Email:</Text>
                <Text style={styles.infoValue}>{email}</Text>
              </View>
            </>
          )}
        </View>
        <View>
          {/* Buttons */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            <Text style={styles.buttonText}>
              {isEditing ? "Save" : "Edit Profile"}
            </Text>
          </TouchableOpacity>

          {isEditing && (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#aaa" }]}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          )}

          {/* Logout Button */}
          {!isEditing && (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "red", marginTop: 30 }]}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
