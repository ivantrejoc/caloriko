import { useCallback, useState, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/header";
import { Button, Icon } from "@rneui/themed";
import { TodayCalories } from "../../components/todayCalories";
import { TodayAliments } from "../../components/todayAliments";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useStorage } from "../../hooks";

const Home = () => {
  const [dailyMeals, setDailyMeals] = useState([]);
  const { navigate } = useNavigation();
  const { onGetTodaysAliment } = useStorage();

  const getDailyMeals = async () => {
    try {
      const dailyMealsList = await onGetTodaysAliment();
      if (dailyMealsList) {
        setDailyMeals(dailyMealsList);
      }
    } catch (error) {
      console.error(error);
      return error.message;
    }
  };

  const totalCalories = 2000;

  const consumedCalories = useMemo(() => {
    return dailyMeals.reduce((accum, curr) => {
      return accum + Number(curr.calories);
    }, 0);
  }, [dailyMeals]);

  const remainingCalories = useMemo(() => {
    const result = totalCalories - consumedCalories;
    return result;
  }, [totalCalories, consumedCalories]);

  const percentage = useMemo(() => {
    const result = (consumedCalories / totalCalories) * 100;
    return result;
  }, [consumedCalories, totalCalories]);

  useFocusEffect(
    useCallback(() => {
      getDailyMeals();
    }, [])
  );

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
      <TodayCalories
        totalCalories={totalCalories}
        consumedCalories={consumedCalories}
        remainingCalories={remainingCalories}
        percentage={percentage}
      />
      <TodayAliments dailyMeals={dailyMeals} onGetDailyMeals={() => getDailyMeals()} />
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
