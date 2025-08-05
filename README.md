# CycleSync

A comprehensive women's health mobile application that helps users track their menstrual cycle and provides personalized recommendations based on their current cycle phase.

## Overview

CycleSync is designed to help women understand and optimize their health by aligning daily activities with their natural hormonal cycles. The app tracks menstrual cycles and provides tailored recommendations for:

- Exercise and physical activity
- Nutrition and diet
- Self-care and recovery practices

The app uses cycle phase tracking to deliver personalized suggestions that help users feel their best throughout their entire cycle.

## Features

- **Cycle Tracking**: Track your menstrual cycle and view predictions for upcoming phases
- **Phase-Based Recommendations**: Get daily suggestions for workouts, nutrition, and self-care based on your current phase
- **Achievement System**: Earn points by completing recommended activities
- **Progress Tracking**: Monitor your consistency and growth over time
- **Personalized Dashboard**: View your current cycle phase and relevant health information at a glance
- **Content Filtering**: Filter content by categories like Today, Premium, Mindset, and more
- **User Profiles**: Manage your personal information and app settings

## Navigation Structure

CycleSync features a modern, intuitive navigation system:

- **Top Header**: Profile picture and action icons (Search, Shopping, Achievements)
- **Horizontal Filters**: Scrollable filter buttons for content categories (Today, Premium, Mindset, etc.)
- **Bottom Tab Navigation**: Main app sections (Cycle, Recovery, Dashboard, Nutrition, Fitness)
- **Active Tab Highlighting**: Visual indication of your current location in the app

## Cycle Phases

CycleSync tracks and provides recommendations for four distinct menstrual cycle phases:

1. **Menstrual Phase**: Focus on rest, gentle movement, and self-care
2. **Follicular Phase**: Building energy with moderate activities and fresh nutrition
3. **Ovulation Phase**: Peak energy for high-intensity workouts and performance
4. **Luteal Phase**: Preparing for renewal with steady activities and mood support

## User Experience

- **Personalized Greeting**: Dashboard welcomes you by name
- **Onboarding Flow**: Simple setup process to collect cycle information and wellness goals
- **Profile Management**: View and edit your profile, with options for settings, notifications, and support
- **Premium Features**: Access to exclusive content with premium subscription

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/cyclesync.git
cd cyclesync
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm run dev
```

4. Type checking
```
# Full TypeScript check
npm run typecheck

# Basic TypeScript check (less strict)
npm run typecheck:basic

# Run TypeScript check in watch mode
npm run typecheck:watch
```

5. Open the app on your device using Expo Go or run in a simulator

## Tech Stack

- React Native
- Expo & Expo Router for file-based navigation
- TypeScript
- AsyncStorage for local data persistence
- React Navigation for tab-based navigation
- Lucide React Native for icons
- Expo Linear Gradient for UI effects
- React Native Safe Area Context for safe area handling

## Project Structure

- `/app` - Main application screens and navigation
  - `/(tabs)` - Tab-based navigation screens (Dashboard, Cycle, Progress, Profile)
  - `/onboarding` - First-time user onboarding flow
  - `/recovery`, `/nutrition`, `/fitness` - Lifestyle content screens
- `/assets` - Images and static assets
- `/hooks` - Custom React hooks
- `/utils` - Utility functions for calculations and storage

## Acknowledgments

- Designed with women's health and wellness as the primary focus
- Built with Expo and React Native for cross-platform compatibility 