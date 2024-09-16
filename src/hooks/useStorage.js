import AsyncStorage from "@react-native-async-storage/async-storage";
import { isToday } from "date-fns";

const MY_ALIMENT_KEY = "@MyAliment:Key";
const MY_TODAY_ALIMENT_KEY = "@MyTodayAliment:Key";

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

  const saveTodayAliment = async ({ calories, name, ration }) => {
    try {
      const todaySavedAliments = await AsyncStorage.getItem(
        MY_TODAY_ALIMENT_KEY
      );
      if (todaySavedAliments !== null) {
        const alimentList = JSON.parse(todaySavedAliments);
        alimentList.push({
          calories,
          name,
          ration,
          date: new Date().toISOString()
        });
        await AsyncStorage.setItem(
          MY_TODAY_ALIMENT_KEY,
          JSON.stringify(alimentList)
        );

        return "Aliment saved!";
      }
      await AsyncStorage.setItem(
        MY_TODAY_ALIMENT_KEY,
        JSON.stringify([
          { calories, name, ration, date: new Date().toISOString() }
        ])
      );
      return "Aliment saved!";
    } catch (error) {
      console.error(error);
      return error.message;
    }
  };

  const getTodaysAliments = async () => {
    try {
      const aliments = await AsyncStorage.getItem(MY_TODAY_ALIMENT_KEY);
      const parsedAliments = JSON.parse(aliments);
      if (!aliments) {
        throw new Error("There are not aliments saved");
      }
      const todaysMeals = parsedAliments.filter((aliment) =>
        isToday(new Date(aliment.date))
      );
      return todaysMeals;
    } catch (error) {
      return error;
    }
  };

  return {
    onSaveAliment: saveAliment,
    onGetAliments: getAliments,
    onSaveTodayAliment: saveTodayAliment,
    onGetTodaysAliment: getTodaysAliments
  };
};
export default useStorage;
