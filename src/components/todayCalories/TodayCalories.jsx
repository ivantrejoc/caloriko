import { StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
const TodayCalories = ({
  totalCalories = 2000,
  consumedCalories = 2000,
  remainingCalories = 2000,
  percentage = 45
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftCont}>
        <CircularProgress value={percentage}  valueSuffix={"%"}
        rotation={0}
         />
      </View>
      <View style={styles.rightCont}>
        <Text style={styles.title}>Today</Text>
        <View style={styles.legendCont}>
          <View style={styles.leftItem}>
            <Text style={styles.legend}>Total</Text>
          </View>
          <View style={styles.rightItem}>
            <Text style={styles.value}>{totalCalories}</Text>
          </View>
        </View>
        <View style={styles.legendCont}>
          <View style={styles.leftItem}>
            <Text style={styles.legend}>Consumed</Text>
          </View>
          <View style={styles.rightItem}>
            <Text style={styles.value}>{consumedCalories}</Text>
          </View>
        </View>
        <View style={styles.legendCont}>
          <View style={styles.leftItem}>
            <Text style={styles.legend}>Remaining</Text>
          </View>
          <View style={styles.rightItem}>
            <Text style={styles.value}>{remainingCalories}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default TodayCalories;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  leftCont: {
    flex: 1,
    justifyContent: "center"
  },
  rightCont: {
    flex: 1
  },
  legendCont: {
    flexDirection: "row"
  },
  leftItem: {
    flex: 1,
    marginBottom: 6
  },
  rightItem: {
    flex: 1,
    marginBottom: 6,
    alignItems: "flex-end"
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 12
  },
  legend: {
    fontSize: 16
  },
  value: {
    fontSize: 16
  }
});
