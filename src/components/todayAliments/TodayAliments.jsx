import { StyleSheet, Text, View, ScrollView } from "react-native";
import { AlimentItem } from "../../components/alimentItem";

const TodayAliments = ({ dailyMeals, onGetDailyMeals }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today Meals</Text>
      <ScrollView style={styles.content}>
        {dailyMeals.length > 0 &&
          dailyMeals?.map((meal, index) => {
            return (
              <AlimentItem
                key={`${meal.name}-${index}`}
                name={meal.name}
                calories={meal.calories}
                ration={meal.ration}
                itemIndex={index}
                onGetDailyMeals={onGetDailyMeals}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};
export default TodayAliments;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10
  }
});
