import 'expo-router/entry';
import "expo-asset";

import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

// Must be exported or Fast Refresh won't update the context
export function App() {
    console.log("App is running; ");
    const ctx = require.context('./src/app');
    return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);