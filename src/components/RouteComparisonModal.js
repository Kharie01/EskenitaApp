import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/colors";

const RouteComparisonModal = ({ visible, onClose, onSelectRoute }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Compare Routes</Text>
          
          <View style={styles.comparison}>
            <View style={styles.routeCard}>
              <View style={styles.routeHeader}>
                <View style={[styles.indicator, { backgroundColor: colors.neonGreen }]} />
                <Text style={styles.routeTitle}>Safe Route</Text>
              </View>
              <Text style={styles.routeDescription}>
                Routes through safe havens and protected areas
              </Text>
              <View style={styles.routeStats}>
                <Text style={styles.stat}>⏱️ Longer duration</Text>
                <Text style={styles.stat}>🛡️ Maximum safety</Text>
              </View>
              <TouchableOpacity
                style={[styles.selectBtn, { backgroundColor: colors.neonGreen }]}
                onPress={() => onSelectRoute("safe")}
              >
                <Text style={styles.selectBtnText}>Select Safe Route</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.routeCard}>
              <View style={styles.routeHeader}>
                <View style={[styles.indicator, { backgroundColor: colors.neonRed }]} />
                <Text style={styles.routeTitle}>Fastest Route</Text>
              </View>
              <Text style={styles.routeDescription}>
                Direct path, may pass through danger zones
              </Text>
              <View style={styles.routeStats}>
                <Text style={styles.stat}>⚡ Fastest time</Text>
                <Text style={styles.stat}>⚠️ Higher risk</Text>
              </View>
              <TouchableOpacity
                style={[styles.selectBtn, { backgroundColor: colors.neonRed }]}
                onPress={() => onSelectRoute("dangerous")}
              >
                <Text style={styles.selectBtnText}>Select Fastest Route</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    padding: 20,
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  comparison: {
    gap: 16,
    marginBottom: 20,
  },
  routeCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
  routeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  routeTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  routeDescription: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 12,
  },
  routeStats: {
    gap: 4,
    marginBottom: 12,
  },
  stat: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  selectBtn: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  selectBtnText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  closeBtn: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  closeText: {
    color: colors.textPrimary,
    fontWeight: "600",
    fontSize: 16,
  },
});

export default RouteComparisonModal;
