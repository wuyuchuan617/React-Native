import React, { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View, Switch, StyleSheet } from "react-native"

import SingleMoviePage from "./Screens/SingleMoviePage"
import QuestionPage from "./Screens/QuestionPage"
import Home from "./Screens/Home"
import { ThemeProvider } from "./theme/theme-context"

const Stack = createNativeStackNavigator()
export default function App() {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: "#63AA98",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                >
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            title: "Home",
                            // headerStyle: {
                            //     backgroundColor: "#f4511e",
                            // },
                            // headerTintColor: "#fff",
                            // headerTitleStyle: {
                            //     fontWeight: "bold",
                            // },
                        }}
                    />
                    <Stack.Screen
                        name="SingleMoviePage"
                        component={SingleMoviePage}
                        options={({ route }) => ({
                            title: route.params.movie,
                        })}
                    />
                    <Stack.Screen
                        name="QuestionPage"
                        component={QuestionPage}
                        options={({ route }) => ({
                            title: route.params.movie,
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    )
}
