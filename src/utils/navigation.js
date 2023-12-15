import { createNavigationContainerRef } from "@react-navigation/native";
export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady) {
    const timeout = setTimeout(() => {
      navigationRef.navigate(name, params);
    }, 100);
    return () => clearTimeout(timeout);
  }
}
