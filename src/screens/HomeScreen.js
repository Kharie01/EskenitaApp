import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DeadManSwitchTimer from "../components/DeadManSwitchTimer";
import GuardianBanner from "../components/GuardianBanner";
import MapViewComponent from "../components/MapViewComponents";
import ThreatReportModal from "../components/ThreatReportModal";
import { analyzeThreatWithAI } from "../services/MockVertexAi";
import { colors } from "../theme/colors";

const HomeScreen = () => {
  const [threatPins, setThreatPins] = useState([]);
  const [isGuardianActive, setIsGuardianActive] = useState(false);
  const [isDeadZoneActive, setIsDeadZoneActive] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSosTriggered, setIsSosTriggered] = useState(false);

  const handleShareGuardian = () => {
    Alert.alert(
      "Link Copied!",
      "Your live location link has been copied. Sending to emergency contacts...",
    );
    setIsGuardianActive(true);
  };

  const handleReportThreat = async (description) => {
    const aiResult = await analyzeThreatWithAI(description);
    setThreatPins((prev) => [...prev, aiResult]);
    setIsModalVisible(false);
  };

  const handleSOS = () => {
    setIsDeadZoneActive(false);
    setIsSosTriggered(true);
    Alert.alert("CRITICAL", "Siren & Offline SMS triggered!", [
      { text: "Dismiss", onPress: () => setIsSosTriggered(false) },
    ]);
  };

  return (
    <View style={[styles.container, isSosTriggered && styles.sosBackground]}>
      <MapViewComponent threatPins={threatPins} />

      <GuardianBanner
        isActive={isGuardianActive}
        onCancel={() => setIsGuardianActive(false)}
      />

      {!isGuardianActive && !isDeadZoneActive && (
        <TouchableOpacity style={styles.shareBtn} onPress={handleShareGuardian}>
          <Text style={styles.shareText}>Share Guardian Link</Text>
        </TouchableOpacity>
      )}

      <View style={styles.bottomControls}>
        <DeadManSwitchTimer
          isActive={isDeadZoneActive}
          onActivate={() => setIsDeadZoneActive(true)}
          onCancel={() => setIsDeadZoneActive(false)}
          onTriggerSOS={handleSOS}
        />
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.fabIcon}>⚠️</Text>
      </TouchableOpacity>

      <ThreatReportModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleReportThreat}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  sosBackground: { backgroundColor: "rgba(255,0,0,0.4)" },
  shareBtn: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.neonGreen,
  },
  shareText: { color: colors.neonGreen, fontWeight: "bold" },
  bottomControls: { position: "absolute", bottom: 30, left: 20, right: 90 },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: colors.neonOrange,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.neonOrange,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  fabIcon: { fontSize: 24 },
});

export default HomeScreen;
