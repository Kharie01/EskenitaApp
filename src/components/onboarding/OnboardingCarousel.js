import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ONBOARDING_SCREENS } from "./OnboardingData";
import OnboardingSlide from "./OnboardingSlide";

const OnboardingCarousel = ({ onComplete, onSkip }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < ONBOARDING_SCREENS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  const currentScreen = ONBOARDING_SCREENS[currentIndex];

  return (
    // Full-bleed backdrop matches the current slide picture's background
    // color, so the artwork blends into the screen edge-to-edge
    <View style={[styles.container, { backgroundColor: currentScreen.bg }]}>
      <OnboardingSlide
        screen={currentScreen}
        index={currentIndex}
        onNext={handleNext}
        onSkip={handleSkip}
        isLastSlide={currentIndex === ONBOARDING_SCREENS.length - 1}
        currentIndex={currentIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OnboardingCarousel;
