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
import { colors } from "../theme/colors";

const ThreatReportModal = ({ visible, onClose, onSubmit }) => {
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim()) return;
    setIsSubmitting(true);
    await onSubmit(description);
    setIsSubmitting(false);
    setDescription("");
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Report a Threat</Text>
          <Text style={styles.subtext}>
            AI will analyze your report and update the safe routing.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Describe the situation... (e.g. suspicious person following me)"
            placeholderTextColor={colors.textSecondary}
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={onClose}
              disabled={isSubmitting}
            >
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color={colors.background} />
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.neonOrange,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    color: colors.neonOrange,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtext: { color: colors.textSecondary, marginBottom: 16 },
  input: {
    backgroundColor: colors.surfaceLight,
    color: colors.textPrimary,
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  buttonRow: { flexDirection: "row", justifyContent: "flex-end", gap: 12 },
  cancelBtn: { padding: 12, borderRadius: 8 },
  btnText: { color: colors.textSecondary, fontWeight: "bold" },
  submitBtn: {
    backgroundColor: colors.neonOrange,
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  submitText: { color: colors.background, fontWeight: "bold" },
});

export default ThreatReportModal;
