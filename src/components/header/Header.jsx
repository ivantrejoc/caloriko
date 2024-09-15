import { StyleSheet, Text, View, Image } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { userInfo } from "../../utils";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const { canGoBack, goBack } = useNavigation();

  return (
    <View style={styles.container}>
      {canGoBack() ? (
        <View style={styles.arrowContainer}>
          <Button type="clear" onPress={() => goBack()}>
            <Icon name="arrow-back" size={24} />
          </Button>
        </View>
      ) : undefined}
      <View style={styles.leftCont}>
        <Text style={styles.name}>{`Hello, ${userInfo.name}`}</Text>
        <Text style={styles.welcome}>Welcome back to your goal! </Text>
      </View>
      <View style={styles.rightCont}>
        <Image style={styles.userImage} source={{ uri: userInfo.avatar }} />
      </View>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  leftCont: {
    flex: 1,
    justifyContent: "center"
  },
  rightCont: {
    flex: 1,
    alignItems: "flex-end"
  },
  name: {
    fontSize: 18,
    fontWeight: "bold"
  },
  welcome: {
    fontSize: 12,
    color: "#808080"
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 25
  },
  arrowContainer: {}
});
