import { StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/header";
const Home = () => {
  return (
    <View style={styles.container}>
      <Header/>
      <Text>Home</Text>
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#FFFFFF"
     }
});
