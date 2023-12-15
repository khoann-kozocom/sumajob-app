import React from "react";
import ContextProvider from "./src/contants/context";
import "react-native-gesture-handler";
import { LoadingProvider } from "./src/components/LoadingContext";
import { QueryClientProvider } from "react-query";
import queryClient from "./src/utils/queryClient";
import AlertContextProvider from "./src/contants/AlertContext";
import { BottomModalProvider } from "./src/contants/BottomModalContext";
import { RootContainer } from "./src/screens/RootContainer";

function App() {
  return (
    <LoadingProvider>
      <AlertContextProvider>
        <QueryClientProvider client={queryClient}>
          <ContextProvider>
            <BottomModalProvider>
              <RootContainer />
            </BottomModalProvider>
          </ContextProvider>
        </QueryClientProvider>
      </AlertContextProvider>
    </LoadingProvider>
  );
}
export default App;
