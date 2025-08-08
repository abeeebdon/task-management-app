import BottomNNavigation from "./BottomTabNav";
import AuthNavigation from "./AuthNavigation";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const RootNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={BottomNNavigation} />
      <Stack.Screen name="auth" component={AuthNavigation} />
    </Stack.Navigator>
  );
};

export default RootNav;
