import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/colors";

const RouteSelector = ({ selectedRoute, onSelectRoute, onCompare }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Route Type</Text>
      <View style={styles.options}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedRoute === "safe" && styles.selectedOption,
            selectedRoute === "safe" && styles.safeSelected,
          ]}
          onPress={() => onSelectRoute("safe")}
        >
          <View style={[styles.dot, selectedRoute === "safe" && styles.selectedDot]} />
          <Text
            style={[
              styles.optionText,
              selectedRoute === "safe" && styles.selectedText,
            ]}
          >
            Safe Route
          </Text>
          <Text style={styles.optionSubtext}>
            Uses safe havens for protection
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selectedRoute === "dangerous" && styles.selectedOption,
            selectedRoute === "dangerous" && styles.dangerousSelected,
          ]}
          onPress={() => onSelectRoute("dangerous")}
        >
          <View style={[styles.dot, selectedRoute === "dangerous" && styles.selectedDot]} />
          <Text
            style={[
              styles.optionText,
              selectedRoute === "dangerous" && styles.selectedText,
            ]}
          >
            Fastest Route
          </Text>
          <Text style={styles.optionSubtext}>
            Direct path, may pass through danger zones
          </Text>
        </TouchableOpacity>
      </View>
      {onCompare && (
        <TouchableOpacity style={styles.compareBtn} onPress={onCompare}>
          <Text style={styles.compareBtnText}>Compare Routes</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  options: {
    gap: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
 selectedOption: {
    borderWidth: 2,
  },
  safeSelected: {
    borderColor: colors.neonGreen,
    backgroundColor: "rgba(40, 167, 69, 0.05)",
  },
  dangerousSelected: {
    borderColor: colors.neonRed,
    backgroundColor: "rgba(220, 53, 69, 0.05)",
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.surfaceLight,
    marginRight: 12,
  },
  selectedDot: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  selectedText: {
    color: colors.primary,
  },
  optionSubtext: {
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: 32,
  },
  compareBtn: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  compareBtnText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default RouteSelector;
