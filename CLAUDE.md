# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Partner System Mobile App for Montonio, a React Native application built with Expo that allows merchants to
manage orders, payment links, and products. The app uses file-based routing via Expo Router and follows a tab-based
navigation structure.

## Development Commands

**Start development server:**

```bash
npm start
# or for specific platforms:
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

**Testing and Quality:**

```bash
npm test         # Run Jest tests in watch mode
npm run lint     # Run ESLint
```

**Environment Setup:**

```bash
npm install      # Install dependencies
```

## Architecture

**Core Technologies:**

- React Native 0.76.6 with Expo SDK ~52.0.27
- Expo Router 4.0 for file-based routing
- NativeWind 4.1 for Tailwind CSS styling
- TypeScript for type safety
- Axios with JWT authentication

**Key Directories:**

- `app/` - Expo Router file-based routing (main application screens)
- `components/` - Reusable UI components with consistent styling
- `services/` - API client and JWT service for authentication
- `context/` - Global state management with React Context
- `types/` - TypeScript interfaces and type definitions
- `utils/` - Helper functions and enums

**Navigation Structure:**

- Root layout with conditional authentication flow
- Tab navigation for main app sections: Orders, Payment Links, Products, Profile
- Authentication group for login/auth screens

**API Integration:**

- Uses Mainframe API with JWT-based authentication
- Automatic JWT token injection via Axios interceptors
- Custom API client in `services/api.client.ts`

**Authentication:**

- Global authentication state managed via `GlobalProvider`
- JWT tokens generated client-side using `expo-jwt`
- Authentication context available throughout the app via `useGlobalContext`

**Styling System:**

- NativeWind (Tailwind CSS for React Native)
- Custom color palette: neutral, primary, accent, success, warning, error
- Consistent component styling via custom components

## Key Implementation Details

- File-based routing requires screens to be placed in the `app/` directory
- Custom components follow consistent patterns - review existing components before creating new ones
- API calls should use the configured `apiClient` which automatically includes JWT authentication
- Global state is managed through the `GlobalProvider` context
- All styling should use NativeWind classes for consistency

## Development Workflow

1. Make code changes
2. Save all files
3. Run `npm run start` - fix any compilation errors
4. Run `npm run lint` - fix any linting issues
5. Only then is the implementation complete