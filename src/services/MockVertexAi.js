// Simulates a call to Google Vertex AI to analyze a reported threat
export const analyzeThreatWithAI = async (description) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock AI determining severity based on keywords
      const isHighSeverity = description
        .toLowerCase()
        .match(/(gun|knife|followed|chased|attack)/);

      resolve({
        severity: isHighSeverity ? "CRITICAL" : "WARNING",
        message: "AI Analysis Complete. Threat logged.",
        // Dropping a mock pin near the route (Cabanatuan coordinates)
        coordinates: { latitude: 15.476, longitude: 120.978 },
      });
    }, 2000); // 2 second simulated delay
  });
};
