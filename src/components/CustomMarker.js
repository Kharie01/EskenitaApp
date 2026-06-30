import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/colors";
import ShieldIcon from "./icons/ShieldIcon";
import AlertIcon from "./icons/AlertIcon";
import MapPinIcon from "./icons/MapPinIcon";

const CustomMarker = ({ type, title, rating, onPress }) => {
  const getMarkerStyle = () => {
    switch (type) {
      case "haven":
        return {
          iconColor: "#39FF14",
          shadowColor: "#39FF14",
          Icon: ShieldIcon,
        };
      case "threat":
        return {
          iconColor: "#FF3131",
          shadowColor: "#FF3131",
          Icon: AlertIcon,
        };
      case "destination":
        return {
          iconColor: "#FF9900",
          shadowColor: "#FF9900",
          Icon: MapPinIcon,
        };
      default:
        return {
          iconColor: "#6C63FF",
          shadowColor: "#6C63FF",
          Icon: MapPinIcon,
        };
    }
  };

  const markerStyle = getMarkerStyle();
  const { Icon, iconColor, shadowColor } = markerStyle;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.marker, { shadowColor }]}>
        <View style={styles.markerInner}>
          <Icon size={22} color={iconColor} />
        </View>
      </View>
      <View style={[styles.pointer, { borderTopColor: shadowColor }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  marker: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  markerInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  icon: {
    fontSize: 22,
  },
  pointer: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 14,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#6C63FF",
    marginTop: -4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default CustomMarker;
