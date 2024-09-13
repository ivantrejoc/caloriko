import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Router } from "./src/routes";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <Router />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  }
});
