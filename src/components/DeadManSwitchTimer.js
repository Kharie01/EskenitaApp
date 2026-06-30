import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";

const DeadManSwitchTimer = ({
  isActive,
  onActivate,
  onCancel,
  onTriggerSOS,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  useEffect(() => {
    if (!isActive) {
      setTimeLeft(240);
    }
  }, [isActive]);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000); // Swap to 100 for fast hackathon demo ticking
    } else if (isActive && timeLeft === 0) {
      onTriggerSOS();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleCancel = () => {
    onCancel();
  };

  if (!isActive) {
    return null;
  }

  return (
    <View style={styles.activeContainer}>
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
          <Text style={styles.cancelText}>I am Safe (Cancel)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.testBtn} onPress={onTriggerSOS}>
          <Text style={styles.testText}>Test SOS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    activateBtn: {
      backgroundColor: colors.card,
      borderColor: colors.neonRed,
      borderWidth: 1,
      padding: 16,
      borderRadius: 30,
      alignItems: "center",
      marginBottom: 20,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    activateText: { color: colors.neonRed, fontWeight: "700", fontSize: 16 },
    activeContainer: {
      backgroundColor: "rgba(220, 53, 69, 0.1)",
      borderColor: colors.neonRed,
      borderWidth: 2,
      borderRadius: 16,
      padding: 20,
      alignItems: "center",
      marginBottom: 20,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 6,
    },
    timerText: {
      color: colors.neonRed,
      fontSize: 48,
      fontWeight: "900",
      marginBottom: 16,
    },
    row: { flexDirection: "row", gap: 10 },
    cancelBtn: {
      backgroundColor: colors.neonGreen,
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 30,
      flex: 1,
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    cancelText: { color: colors.textPrimary, fontWeight: "700", fontSize: 16 },
    testBtn: {
      backgroundColor: colors.card,
      borderColor: colors.neonRed,
      borderWidth: 1,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 30,
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    testText: { color: colors.neonRed, fontWeight: "700" },
  });

export default DeadManSwitchTimer;
