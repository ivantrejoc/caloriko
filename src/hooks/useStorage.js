import AsyncStorage from "@react-native-async-storage/async-storage";

const MY_ALIMENT_KEY = "@MyAliment:Key";

const useStorage = () => {
  const saveAliment = async ({ calories, name, ration }) => {
    try {
      const currentSavedAliments = await AsyncStorage.getItem(MY_ALIMENT_KEY);
      if (currentSavedAliments !== null) {
        const alimentList = JSON.parse(currentSavedAliments);
        alimentList.push({ calories, name, ration });
        await AsyncStorage.setItem(MY_ALIMENT_KEY, JSON.stringify(alimentList));

        return "Aliment saved!";
      }
      await AsyncStorage.setItem(
        MY_ALIMENT_KEY,
        JSON.stringify([{ calories, name, ration }])
      );
      return "Aliment saved!";
    } catch (error) {
      console.error;
      return error.message;
    }
  };
  const getAliments = async () => {
    try {
      const aliments = await AsyncStorage.getItem(MY_ALIMENT_KEY);
      if (!aliments) {
        throw new Error("There are not aliments saved");
      }
      return JSON.parse(aliments);
    } catch (error) {
      return error;
    }
  };

  return {
    onSaveAliment: saveAliment,
    onGetAliments: getAliments
  };
};
export default useStorage;
