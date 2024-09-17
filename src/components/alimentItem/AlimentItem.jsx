import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { useStorage } from "../../hooks";

const AlimentItem = ({
  calories,
  name,
  ration,
  itemIndex,
  ableToAdd,
  onGetDailyMeals
}) => {
  const { onSaveTodayAliment, onRemoveTodayAliment } = useStorage();

  const handleIconPress = async () => {
    try {
      if (ableToAdd) {
        await onSaveTodayAliment({ calories, name, ration });
        Alert.alert("Aliment added to today");
      } else {
        await onRemoveTodayAliment(itemIndex);
        Alert.alert("Aliment removed");
        if (onGetDailyMeals) {
          onGetDailyMeals();
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Something goes wrong. ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftCont}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.ration}>{ration}</Text>
      </View>
      <View style={styles.rightCont}>
        <Button
          type="clear"
          style={styles.iconButton}
          onPress={handleIconPress}
        >
          <Icon name={ableToAdd ? "add-circle-outline" : "close"} />
        </Button>
        <Text style={styles.calories}>{calories} Kcal</Text>
      </View>
    </View>
  );
};
export default AlimentItem;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ADE8AF",
    flexDirection: "row",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12
  },
  leftCont: {
    flex: 1,
    justifyContent: "center"
  },
  rightCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  name: {
    fontSize: 18,
    fontWeight: "500"
  },
  ration: {
    fontSize: 14,
    color: "#808080",
    fontWeight: "500"
  },
  calories: {
    fontSize: 18
  },
  iconButton: {
    marginBottom: -12
  }
});
