import React, { useState, useContext } from "react"
import { ThemeContext } from "../theme/theme-context"
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ScrollView,
    SectionList,
    FlatList,
    SafeAreaView,
    Dimensions,
    Image,
} from "react-native"

function SingleMoviePage({ route, navigation }) {
    const { movie } = route.params
    const { dark, theme, toggle } = useContext(ThemeContext)
    return (
        <View
            style={{
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
                backgroundColor: theme.backgroundCard,
                // height: 60,
            }}
        >
            <Image
                source={{
                    uri: "https://reactnative.dev/img/tiny_logo.png",
                }}
                style={{
                    width: 30,
                    height: 30,
                    marginRight: 5,
                }}
            ></Image>
            <Text style={{ color: theme.color }}>{movie}</Text>
        </View>
    )
}

export default SingleMoviePage
