# Gabay

> A pedestrian safety navigation app that routes you home safely, not just quickly.

[![Expo](https://img.shields.io/badge/Expo-SDK%2052-000020?logo=expo)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.76-61DAFB?logo=react)](https://reactnative.dev)
[![Google Maps Platform](https://img.shields.io/badge/Google%20Maps-Platform-4285F4?logo=googlemaps&logoColor=white)](https://mapsplatform.google.com/)
[![Google Vertex AI](https://img.shields.io/badge/Google%20Vertex%20AI-Gemini-4285F4?logo=googlecloud&logoColor=white)](https://cloud.google.com/vertex-ai)

---

> Built by Team **O(4)** for the **SparkFest 2026** Hackathon.

**Team Members**

- Kharie Ladignon
- John Dray Lao
- Vida Marie Quinia
- Vince Aivan Rumalay

---

## Overview

Gabay is a **context-aware pedestrian navigation app** built for Filipino commuters who walk home at night. Unlike Google Maps or Waze — which optimize for speed — Eskenita routes users based on a dynamic **AI-calculated Safety Score**, keeping them on well-lit streets, near open establishments, and away from known hazard zones.

The name comes from _eskenita_ — the Filipino word for the narrow, dark back alleys that are common in Philippine neighborhoods and are frequently associated with crime and poor lighting.

Built with **React Native (Expo)**, powered by the **Google Maps Platform** and **Google Vertex AI (Gemini)**, and designed around the needs of:

- **Night-shift BPO workers** commuting home after the graveyard shift
- **University students** walking to and from transit stops
- **Women** navigating public spaces alone at night
- **Minimum-wage earners** who rely on walking as their primary mode of transit

This project is built under the theme of **UN SDG 11: Sustainable Cities and Communities**.

---

## The Problem

Navigation apps are built for cars. When a pedestrian uses Google Maps, the fastest route often means:

- Dark, unlit _eskenitas_ (alleyways) with no foot traffic
- Isolated streets with no nearby open establishments
- No awareness of real-time local hazards (busted streetlights, suspicious crowds, stray dogs)
- No way to signal distress or share your route with a trusted contact

For the **1.57 million Filipinos** employed in the BPO sector — the majority of whom work overnight — this isn't a minor inconvenience. It's a nightly safety risk. Filipino women, in particular, face documented harassment in public spaces, with UN Women citing high incidence rates in low-foot-traffic neighborhoods across Metro Manila.

No existing app in the Philippine market generates pedestrian routes using a real-time, safety-first model.

---

## The Solution

Eskenita replaces the "fastest route" logic with a **Dynamic Safety Score** per street segment, computed by weighing:

| Factor                 | Weight | Description                                           |
| ---------------------- | ------ | ----------------------------------------------------- |
| Street Lighting Index  | 30%    | Crowdsourced reports of working / broken streetlights |
| Foot Traffic Density   | 25%    | Time-of-day pedestrian activity estimates             |
| Safe Haven Proximity   | 20%    | Distance to verified 24/7 open establishments         |
| Threat Reports         | 15%    | Real-time user-submitted hazard reports               |
| Social Media Sentiment | 10%    | NLP analysis of hyper-local safety sentiment          |

The app then presents two route options: the **fastest route** (gray) and the **Eskenita Safe Route** (green) — and lets the user decide.

---

## Features

### Safety-First Map

- Dark-mode map styled for nighttime navigation
- Two rendered routes side-by-side: fastest vs. safest
- Verified **Safe Haven markers** (24/7 stores, pharmacies, late-night cafes) along the safe route
- Tap any marker to see: _"Verified Safe Haven: 24/7 Convenience Store"_

### Community Threat Reporting

- Floating **SOS / Report button** always accessible from the map
- Bottom sheet modal for submitting local hazard reports
- Supports Filipino-language input (e.g., _"Sobrang dilim dito"_, _"May nag-iinuman sa kanto"_)
- Powered by **Vertex AI (Gemini)** for real-time threat classification

### AI Threat Analysis

- Submitted reports are analyzed by Gemini for:
  - **Risk Score** (0–10)
  - **Risk Label** (Low / Medium / High)
  - **Recommended action** (e.g., _"Dropping warning pin."_)
- A red warning pin is dynamically placed on the map at the report location

### Digital Kasama (Guardian Link)

- Share a live tracking link with a trusted contact (family member, friend, co-worker)
- Active session shows a persistent banner: _"Digital Kasama Active: Location being securely shared."_
- One tap to cancel the sharing session

### Dead Man's Switch (Offline Safety Timer)

- Start a countdown timer when entering a dead zone or area with poor signal
- If you don't check in before the timer hits zero, the app:
  - Triggers a local alarm and strobe effect
  - Queues an SMS distress signal with your last known GPS coordinates to emergency contacts
- Works **fully offline** — no internet required for the timer logic

---

## Tech Stack

| Layer                    | Technology                                      |
| ------------------------ | ----------------------------------------------- |
| **Mobile Framework**     | React Native (Expo SDK 52)                      |
| **Maps & Navigation**    | `react-native-maps` + Google Maps Platform      |
| **Routing API**          | Google Maps Routes API                          |
| **Places / Safe Havens** | Google Maps Places API                          |
| **AI / NLP**             | Google Vertex AI (Gemini)                       |
| **Route Information**    | Google Directions API                           |
| **Address Information**  | Google Geocoding API                            |
| **Backend**              | Python (FastAPI) on Google Cloud Run            |
| **Database / Realtime**  | Firebase Firestore + Firebase Realtime Database |
| **Auth**                 | Firebase Authentication                         |
| **State Management**     | React Context / useState                        |

---

## Getting Started

> **MVP Notice:** This is a demo build. AI threat analysis, Firebase, and the FastAPI backend are mocked. The only external service you need to configure is the **Google Maps API key**.

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- [Git](https://git-scm.com/)
- A **Google Cloud** project with the following APIs enabled:
  - Maps SDK for Android
  - Maps SDK for iOS

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/draylao/EskenitaApp.git
   cd EskenitaApp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root of the project:

   ```env
   # Google Maps Platform
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

   > **Never commit your `.env` file.** It is already listed in `.gitignore`.

4. **Start the development server**

   ```bash
   npx expo start
   ```

   Then open the app in your preferred environment:

   | Option                  | Command / Action                                                                              |
   | ----------------------- | --------------------------------------------------------------------------------------------- |
   | Expo Go (quick preview) | Scan the QR code with the Expo Go app                                                         |
   | Android Emulator        | Press `a` in the terminal                                                                     |
   | iOS Simulator           | Press `i` in the terminal (macOS only)                                                        |
   | Development Build       | Follow [Expo dev build guide](https://docs.expo.dev/develop/development-builds/introduction/) |

   > **Note:** `react-native-maps` with Google Maps requires a **development build** for full functionality. Expo Go has limited map support.

---

## Acknowledgements

- [UN Women Safe Cities Initiative](https://www.unwomen.org/en/news/in-focus/women-and-the-sdgs/sdg-11-sustainable-cities-communities) — for the research foundation on women's public space safety
- [Google for Startups](https://startup.google.com/) — for the cloud and AI infrastructure this project is built on
- The Filipino night-shift workers, students, and commuters whose safety this project exists to protect

---

<p align="center">
  Built with Security for the streets of the Philippines. <br/>
  <em>"Ligtas na lakbay, hatid ng Gabay."</em>
</p>
