import { NavigationContainer } from "@react-navigation/native";
import RootNav from "./navigation/RootNav";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNav />
      </NavigationContainer>
    </AuthProvider>
  );
}
