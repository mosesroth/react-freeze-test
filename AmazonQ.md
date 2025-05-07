# React Freeze Test App for Fire OS

This project demonstrates the use of [react-freeze](https://github.com/software-mansion/react-freeze) in an Expo application, specifically targeting Fire OS devices.

## What is React Freeze?

React Freeze is a library that allows you to "freeze" React components, preventing them from re-rendering while preserving their state. This is particularly useful for:

- Improving performance by preventing unnecessary re-renders
- Optimizing offscreen or hidden components
- Reducing battery consumption on mobile devices

## Project Structure

- `components/FreezeTest.tsx`: Main component demonstrating react-freeze functionality
- `app/(tabs)/freeze-test.tsx`: Tab screen that displays the FreezeTest component

## Running on Fire Tablet

### Prerequisites

1. Enable Developer Options on your Fire Tablet
   - Go to Settings > Device Options > About Fire Tablet
   - Tap on the Serial Number 7 times until you see "You are now a developer!"
   - Go back to Device Options and you'll see "Developer Options"
   - Enable "USB Debugging"

2. Install ADB on your computer
   - For macOS: `brew install android-platform-tools`
   - For Windows: Download from Android developer website

### Building and Deploying

1. Build the Android APK:
   ```bash
   npx expo prebuild --platform android
   cd android
   ./gradlew assembleDebug
   ```

2. Connect your Fire Tablet via USB and install the app:
   ```bash
   adb install -r app/build/outputs/apk/debug/app-debug.apk
   ```

3. Launch the app on your Fire Tablet:
   ```bash
   adb shell monkey -p com.freezetest.app -c android.intent.category.LAUNCHER 1
   ```

## Testing the Freeze Functionality

1. Open the app and navigate to the "Freeze Test" tab
2. Observe the counter incrementing every second
3. Press "Freeze Component" to freeze the component
4. Notice that the counter stops updating, but the component remains visible
5. Press "Unfreeze Component" to resume updates

## Performance Benefits

The main benefits of using react-freeze on Fire OS devices include:

- Reduced CPU usage for offscreen components
- Better battery life
- Smoother UI performance
- Decreased memory pressure

## Implementation Details

The implementation uses the `Freeze` component from react-freeze:

```jsx
<Freeze freeze={isFrozen}>
  <ExpensiveComponent />
</Freeze>
```

When `isFrozen` is true, the component's render tree is preserved but not re-rendered, saving valuable resources.
