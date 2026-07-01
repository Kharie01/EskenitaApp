import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AlertTriangle,
  Lock,
  MoonStar,
  Radio,
  TriangleAlert,
  User,
} from "lucide-react-native";
import { useTheme } from "../theme/ThemeContext";

const CATEGORIES = [
  { id: "no_lighting", label: "No lighting", Icon: MoonStar },
  { id: "suspicious_person", label: "Suspicious person", Icon: User },
  { id: "street_blocked", label: "Street blocked", Icon: Lock },
  { id: "other", label: "Other", Icon: AlertTriangle },
];

const SEVERITIES = [
  { id: "low", label: "Low" },
  { id: "medium", label: "Medium" },
  { id: "high", label: "High" },
];

/**
 * ThreatReportModal
 *
 * Pass `userLocation` ({ latitude, longitude }) and optionally `locationLabel`
 * (a human-readable area name, e.g. from reverse geocoding) so the report can
 * be auto-pinned to where the user is standing when they submit.
 *
 * onSubmit receives the full report object:
 * {
 *   category, severity, description, location, locationLabel, reportedAt
 * }
 * The parent is responsible for dropping a marker on the map at `location`
 * and wiring that marker's onPress to open a details view with this payload.
 */
const ThreatReportModal = ({
  visible,
  onClose,
  onSubmit,
  userLocation,
  locationLabel = "Current location",
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [category, setCategory] = useState(null);
  const [severity, setSeverity] = useState("medium");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeLabel = new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const canSubmit = !!category && !isSubmitting;

  const resetForm = () => {
    setCategory(null);
    setSeverity("medium");
    setDescription("");
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!category || isSubmitting) return;
    setIsSubmitting(true);

    const report = {
      category,
      severity,
      description: description.trim(),
      location: userLocation || null, // auto-attached, this is what pins the marker
      locationLabel,
      reportedAt: new Date().toISOString(),
    };

    try {
      await onSubmit(report);
      resetForm();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headerRow}>
            <View style={styles.warnBadge}>
              <TriangleAlert size={18} color={colors.neonRed} />
            </View>
            <View style={styles.headerTextWrap}>
              <Text style={styles.header}>What's unsafe?</Text>
              <Text style={styles.subtext}>
                {timeLabel} · {locationLabel}
              </Text>
            </View>
          </View>

          {/* Category grid */}
          <View style={styles.grid}>
            {CATEGORIES.map(({ id, label, Icon }) => {
              const selected = category === id;
              return (
                <TouchableOpacity
                  key={id}
                  style={[styles.categoryCard, selected && styles.categoryCardSelected]}
                  onPress={() => setCategory(id)}
                  activeOpacity={0.85}
                >
                  <Icon size={20} color={selected ? colors.primary : colors.textSecondary} />
                  <Text
                    style={[styles.categoryLabel, selected && styles.categoryLabelSelected]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Details */}
          <TextInput
            style={styles.input}
            placeholder="Any details to help others?..."
            placeholderTextColor={colors.textSecondary}
            multiline
            value={description}
            onChangeText={setDescription}
          />

          {/* Severity */}
          <Text style={styles.sectionLabel}>How severe?</Text>
          <View style={styles.severityRow}>
            {SEVERITIES.map(({ id, label }) => {
              const selected = severity === id;
              return (
                <TouchableOpacity
                  key={id}
                  style={[styles.severityPill, selected && styles.severityPillSelected]}
                  onPress={() => setSeverity(id)}
                  activeOpacity={0.85}
                >
                  <Text
                    style={[styles.severityText, selected && styles.severityTextSelected]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Footer */}
          <View style={styles.footerRow}>
            <View style={styles.liveRow}>
              <Radio size={13} color={colors.primary} />
              <Text style={styles.liveText}>Shared in real-time</Text>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={handleClose}
              disabled={isSubmitting}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              disabled={!canSubmit}
              activeOpacity={0.85}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#1A1100" />
              ) : (
                <Text style={styles.submitText}>Submit Report</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: colors.overlay || "rgba(0, 0, 0, 0.55)",
      justifyContent: "center",
      padding: 20,
    },
    modalContainer: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 8,
    },

    // Header
    headerRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 12,
      marginBottom: 16,
    },
    warnBadge: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "rgba(255, 77, 77, 0.12)",
      alignItems: "center",
      justifyContent: "center",
    },
    headerTextWrap: {
      flex: 1,
    },
    header: {
      color: colors.neonRed,
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 4,
    },
    subtext: { color: colors.textSecondary, fontSize: 13 },

    // Category grid
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 16,
    },
    categoryCard: {
      width: "47%",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: colors.surface,
      borderRadius: 14,
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderWidth: 1.5,
      borderColor: colors.border || colors.surfaceLight,
    },
    categoryCardSelected: {
      borderColor: colors.primary,
      backgroundColor: "rgba(255, 138, 61, 0.08)",
    },
    categoryLabel: {
      color: colors.textSecondary,
      fontSize: 13,
      fontWeight: "600",
      flexShrink: 1,
    },
    categoryLabelSelected: {
      color: colors.primary,
    },

    // Description input
    input: {
      backgroundColor: colors.surface,
      color: colors.textPrimary,
      borderRadius: 12,
      padding: 12,
      minHeight: 90,
      textAlignVertical: "top",
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border || colors.surfaceLight,
    },

    // Severity
    sectionLabel: {
      color: colors.textSecondary,
      fontSize: 12,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 10,
    },
    severityRow: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 16,
    },
    severityPill: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border || colors.surfaceLight,
    },
    severityPillSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    severityText: {
      color: colors.textSecondary,
      fontWeight: "600",
      fontSize: 13,
    },
    severityTextSelected: {
      color: "#1A1100",
    },

    // Footer
    footerRow: {
      marginBottom: 16,
    },
    liveRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    liveText: {
      color: colors.primary,
      fontSize: 12,
      fontWeight: "600",
    },

    buttonRow: { flexDirection: "row", justifyContent: "flex-end", gap: 12 },
    cancelBtn: {
      padding: 12,
      borderRadius: 8,
      justifyContent: "center",
    },
    cancelText: { color: colors.textSecondary, fontWeight: "600" },
    submitBtn: {
      backgroundColor: colors.neonRed,
      padding: 12,
      borderRadius: 8,
      minWidth: 140,
      alignItems: "center",
    },
    submitBtnDisabled: {
      opacity: 0.5,
    },
    submitText: { color: "#FFFFFF", fontWeight: "600" },
  });

export default ThreatReportModal;