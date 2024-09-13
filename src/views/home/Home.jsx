import { StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/header";
import { Button, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const { navigate } = useNavigation();
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
