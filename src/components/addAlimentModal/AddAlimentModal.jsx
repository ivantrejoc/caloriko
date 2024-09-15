import { Button, Icon, Input } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Modal, View, StyleSheet, Text } from "react-native";
import { useStorage } from "../../hooks";

const AddAlimentModal = ({ onClose, visible }) => {
  const [calories, setCalories] = useState("");
  const [name, setName] = useState("");
  const [ration, setRation] = useState("");
  const { onSaveAliment } = useStorage();

  useEffect(() => {
    setCalories("");
    setName("");
    setRation("");
  }, [visible]);

  const handleSubmit = async () => {
    try {
      await onSaveAliment({
        calories,
        name,
        ration
      });

      onClose(true);
    } catch (error) {
      console.error(error);
      return error.message;
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => onClose()}
      transparent
      animationType="slide"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeCont}>
            <Button onPress={() => onClose()} type="clear">
              <Icon name="close" size={28} />
            </Button>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputCont}>
              <Input
                value={calories}
                onChangeText={(text) => setCalories(text)}
              />
            </View>
            <View style={styles.legendCont}>
              <Text style={styles.inputLegend}>KCAL</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputCont}>
              <Input value={name} onChangeText={(text) => setName(text)} />
            </View>
            <View style={styles.legendCont}>
              <Text style={styles.inputLegend}>Name</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputCont}>
              <Input value={ration} onChangeText={(text) => setRation(text)} />
            </View>
            <View style={styles.legendCont}>
              <Text style={styles.inputLegend}>Ration</Text>
            </View>
          </View>
          <View style={styles.addButtonCont}>
            <Button
              title="Add"
              color="#4ECB71"
              radius={"lg"}
              icon={<Icon name="add" color="#FFFFFF" />}
              onPress={handleSubmit}
              disabled={
                calories.trim() === "" ||
                name.trim() === "" ||
                ration.trim() === ""
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default AddAlimentModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  content: {
    width: "75%",
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
    elevation: 5
  },
  closeCont: {
    alignItems: "flex-end"
  },
  formItem: {
    flexDirection: "row",
    alignItems: "center"
  },
  inputCont: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: -12
  },
  legendCont: {
    flex: 1,
    justifyContent: "center"
  },
  inputLegend: {
    fontSize: 16,
    fontWeight: "500"
  },
  addButtonCont: {
    alignItems: "flex-end"
  }
});
