import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, ScrollView } from "react-native";
import { Header } from "../../components/header";
import { AddAlimentModal } from "../../components/addAlimentModal";
import { AlimentItem } from "../../components/alimentItem";
import { Button, Icon, Input } from "@rneui/themed";
import { useStorage } from "../../hooks";

const AddAliment = () => {
  const [visible, setVisible] = useState(false);
  const [savedAliments, setSavedAliments] = useState([]);
  const [search, setSearch] = useState("");
  const { onGetAliments } = useStorage();

  useEffect(() => {
    const aliments = async () => {
      try {
        const getAliments = await getAlimentsList();
        if (getAliments) {
          setSavedAliments(getAliments);
        }
      } catch (error) {
        console.error(error);
        return error.message;
      }
    };
    aliments();
  }, []);

  const getAlimentsList = async () => {
    try {
      const alimentsList = await onGetAliments();
      setSavedAliments(alimentsList);
    } catch (error) {
      console.error(error);
      return error.message;
    }
  };

  const handleCloseModal = async (shouldUpadate) => {
    if (shouldUpadate) {
      Alert.alert("Aliment saved");
      getAlimentsList();
    }
    setVisible(false);
  };

  const handleSearch = async () => {
    try {
      const lowerCaseSearch = search.toLowerCase();
      const allAliments = await onGetAliments();
      const filteredAliments = await allAliments.filter((aliment) =>
        aliment.name.toLowerCase().includes(lowerCaseSearch)
      );
      setSavedAliments(filteredAliments);
    } catch (error) {
      console.error(error);
      return error.message;
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.actionsCont}>
        <View style={styles.addAlimentCont}>
          <View style={styles.leftCont}>
            <Text style={styles.alimentLegend}>Add Aliment</Text>
          </View>
          <View style={styles.rightCont}>
            <Button
              radius={"lg"}
              color="#4ECB71"
              type="solid"
              onPress={() => setVisible(true)}
            >
              <Icon name="add-circle-outline" color="#FFFFFF" />
            </Button>
          </View>
        </View>
        <View style={styles.searchCont}>
          <View style={styles.leftSearchContainer}>
            <Input
              placeholder="Apples, fries, soda..."
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          </View>
          <Button
            radius={"lg"}
            color="#ADE8AF"
            type="solid"
            title={"Search"}
            titleStyle={styles.searchButtonTitle}
            onPress={handleSearch}
          />
        </View>
      </View>
      {visible && (
        <AddAlimentModal visible={visible} onClose={handleCloseModal} />
      )}
      <ScrollView style={styles.alimentsContainer}>
        {savedAliments?.map((aliment) => (
          <AlimentItem
            key={aliment.name}
            name={aliment.name}
            calories={aliment.calories}
            ration={aliment.ration}
          />
        ))}
      </ScrollView>
    </View>
  );
};
export default AddAliment;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#FFFFFF"
  },
  actionsCont: {
    marginVertical: 24
  },
  addAlimentCont: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  leftCont: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  alimentLegend: {
    fontSize: 22
  },
  rightCont: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  searchCont: {
    flexDirection: "row",
    paddingHorizontal: 0,
    marginVertical: 12
  },
  leftSearchContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: -12
  },
  searchButtonTitle: {
    color: "#000000",
    fontSize: 14
  },
  alimentsContainer: {
    flex: 1,
    backgroundColor: "plum"
  }
});
