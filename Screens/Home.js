import React, { useState, useContext } from "react"
import { StatusBar } from "expo-status-bar"
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
    Switch,
    useColorScheme,
} from "react-native"

function Home({ navigation }) {
    const { dark, theme, toggle } = useContext(ThemeContext)
    console.log(navigation)
    const [isHungry, setIsHungry] = useState(true)
    const [text, setText] = useState("")
    const [movieList, setMovieList] = useState([])
    const [movieListFilter, setMovieListFilter] = useState([])

    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

    const colorScheme = useColorScheme()

    const getMoviesFromApi = () => {
        return fetch("https://reactnative.dev/movies.json")
            .then((response) => response.json())
            .then((json) => {
                setMovieList(json.movies)
                setMovieListFilter(json.movies)
                return json.movies
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const serchFilter = (text) => {
        if (text === "") setMovieListFilter(movieList)
        let result = movieList.filter((item) => {
            return item.title.includes(text) === true
        })
        setMovieListFilter(result)
    }
    return (
        <ScrollView>
            <SafeAreaView
                style={styles.container}
                style={{ backgroundColor: theme.backgroundCard }}
            >
                {/* <Text>Open up App.js to start working on your app!</Text> */}
                <StatusBar style="auto" />

                <Switch
                    trackColor={{ false: "#767577", true: "#ccc" }}
                    thumbColor={dark ? "#fff" : "#f4f3f4"}
                    onValueChange={toggle}
                    value={dark}
                />
                <Text
                    style={{
                        fontSize: 18,
                        marginTop: 10,
                        fontWeight: "600",
                        color: theme.color,
                    }}
                >
                    Movie List
                </Text>
                <TextInput
                    style={{
                        width: Dimensions.get("window").width - 40,
                        paddingLeft: 20,
                        margin: 20,
                        height: 50,
                        borderWidth: 1,
                        borderColor: "lightgrey",
                        backgroundColor: "white",
                        borderRadius: "10px",
                    }}
                    placeholder="Search"
                    onChangeText={(newText) => {
                        setText(newText)
                        serchFilter(newText)
                    }}
                    defaultValue={text}
                />
                {/* <Text style={{ padding: 10, fontSize: 42 }}>
          {text
            .split(" ")
            // .map((word) => word && "🍕")
            .join(" ")}
        </Text> */}
                <View
                    style={{
                        width: Dimensions.get("window").width - 40,

                        height: 60,

                        margin: 10,
                        marginBottom: 30,
                        marginTop: 20,
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "space-between",

                        // paddingRight: 20,

                        // paddingLeft: 20,
                    }}
                >
                    <Image
                        source={{
                            uri: "data:image/jpeg;base64,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",
                        }}
                        style={{ width: 100, height: 100 }}
                    ></Image>
                    <Image
                        source={{
                            uri: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/index-2-1597782864.jpg",
                        }}
                        style={{ width: 100, height: 100 }}
                    ></Image>
                    <Image
                        source={{
                            uri: "data:image/jpeg;base64,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",
                        }}
                        style={{ width: 100, height: 100 }}
                    ></Image>
                </View>
                <View style={{ height: Dimensions.get("window").height }}>
                    <Button
                        color="#841584"
                        style={{ backgroundColor: "white" }}
                        onPress={() => {
                            setIsHungry(!isHungry)
                            isHungry
                                ? getMoviesFromApi()
                                : setMovieListFilter([])
                        }}
                        // disabled={!isHungry}
                        title={isHungry ? "GET MOVIE!" : "CLEAR MOVIE!"}
                    />
                    {movieListFilter.length === 0 && (
                        <Text
                            style={{
                                fontSize: 18,
                                marginTop: 10,
                                width: Dimensions.get("window").width - 40,
                                textAlign: "center",
                                fontWeight: "600",
                            }}
                        >
                            {"0 Result!"}
                        </Text>
                    )}

                    {movieListFilter.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    width: Dimensions.get("window").width - 40,
                                    backgroundColor: "white",
                                    height: 60,
                                    borderRadius: "5px",
                                    margin: 10,
                                    display: "flex",
                                    flexDirection: "row",
                                    alignContent: "center",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    border: "1px solid lightgrey",
                                    // paddingTop: 20,
                                    paddingRight: 20,
                                    // paddingBottom: 20,
                                    paddingLeft: 20,
                                }}
                            >
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignContent: "center",
                                        alignItems: "center",
                                        justifyContent: "space-between",
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
                                    <Text
                                        style={{
                                            padding: 10,
                                            fontSize: 14,
                                            fontWeight: "600",
                                            letterSpacing: "0.5px",
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        padding: 10,
                                        fontSize: 14,
                                        fontWeight: "600",
                                    }}
                                    onPress={() =>
                                        navigation.navigate("SingleMoviePage", {
                                            movie: item.title,
                                        })
                                    }
                                >
                                    GO
                                </Text>
                            </View>
                        )
                    })}

                    {/* <FlatList
          data={movieList}
          renderItem={({ item }) => <Text>{item.title}</Text>}
          style={{ width: Dimensions.get("window").width, paddingLeft: 20 }}
        />
        <SectionList
          sections={[
            { title: "D", data: ["Devin", "Dan", "Dominic"] },
            {
              title: "J",
              data: [
                "Jackson",
                "James",
                "Jillian",
                "Jimmy",
                "Joel",
                "John",
                "Julie",
              ],
            },
          ]}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
        /> */}
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        // backgroundColor: dark ? "#f9f9f9" : "red",

        alignItems: "center",
        justifyContent: "center",
        // height: Dimensions.get("window").height,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: "bold",
        backgroundColor: "rgba(247,247,247,1.0)",
        width: Dimensions.get("window").width,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})
