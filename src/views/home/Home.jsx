import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/header";
import { Button, Icon } from "@rneui/themed";
import { TodayCalories } from "../../components/todayCalories";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useStorage } from "../../hooks";

const Home = () => {
  const [dailyMeals, setDailyMeals] = useState([]);
  const { navigate } = useNavigation();
  const { onGetTodaysAliment } = useStorage();

  useFocusEffect(
    useCallback(() => {
      const getDailyMeals = async () => {
        try {
          const dailyMealsList = await onGetTodaysAliment();
          console.log("MEAL LIST FROM STORAGE: ", dailyMealsList);
          if (dailyMealsList) {
            setDailyMeals(dailyMealsList);
          }
        } catch (error) {
          console.error(error);
          return error.message;
        }
      };
      getDailyMeals();
    }, [])
  );
  console.log("DAILY MEALS: ", dailyMeals);

  const handleAddCalories = () => {
    navigate("AddAliment");
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.caloriesCont}>
        <View style={styles.leftCont}>
          <Text style={styles.calories}>Calories</Text>
        </View>
        <View style={styles.rightCont}>
          <Button radius={"lg"} color="#4ECB71" type="solid">
            <Icon
              name="add-circle-outline"
              color="#FFFFFF"
              onPress={handleAddCalories}
            />
          </Button>
        </View>
      </View>
      <TodayCalories />
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#FFFFFF"
  },
  caloriesCont: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24
  },
  leftCont: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  calories: {
    fontSize: 22
  },
  rightCont: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  }
});
