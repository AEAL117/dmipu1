import React, { useContext } from "react"; 

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginScreen from "../../pages/Login";
import SettingsScreen from "../../pages/Settings";
import CatalogoScreen from "../../pages/Catalogo";
import HomeScreen from "../../pages/Home";

import { GlobalContext } from "../../context/global/global.context";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function MainNavigator({user}) {
    const {state, login, logout} = useContext(GlobalContext);
    return (
      <NavigationContainer>
        {!state.user ? (
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              children= {(props) => (
                <LoginScreen {...props} onPress={()=> login()} />
              )}
              name="Login"
            />
          </Stack.Navigator>
          ) : (
            <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size}) => {
                let iconName;
  
                if (route.name === "Registro Libros") {
                  iconName = focused
                    ? "ios-home"
                    : "ios-home-outline";
                } else if (route.name === "Catalogo"){
                  iconName = focused
                    ? "ios-book"
                    : "ios-book-outline";
                } else if (route.name === "Informacion Alumnos"){
                  iconName = "ios-person";
                }
  
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "blue",
              tabBarInactiveTintColor: "gray",
            })}
            >
              <Tab.Screen 
              name="Registro Libros"
              component={HomeScreen}
              />
              <Tab.Screen name="Catalogo" 
              component={CatalogoScreen}
              />
              <Tab.Screen 
              name="Informacion Alumnos"
              children={(props) => (
                <SettingsScreen {...props} onPress={() => logout()} user={user}/>
              )}
              />
            </Tab.Navigator>
          )}
      </NavigationContainer>
    )
}