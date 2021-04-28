import React, { Suspense, useCallback, useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { createGlobalStyle } from "styled-components";
import adapter from "webrtc-adapter";

import { AnimatedSwitch } from "./components/AnimatedSwitch";
import { PageLoading } from "./components/PageLoading";
import { Confirm } from "./containers/Confirm";
import { useTravelRecord } from "./hooks/useTravelRecord";

const QRGenerator = React.lazy(() => import("./containers/QRGenerator"));
const QRReader = React.lazy(() => import("./containers/QRReader"));
const CameraSetting = React.lazy(() => import("./containers/CameraSetting"));
const Tutorial = React.lazy(() => import("./containers/Tutorial"));
const MainScreen = React.lazy(() => import("./containers/MainScreen"));
const Disclaimer = React.lazy(() => import("./containers/Disclaimer"));
const Login = React.lazy(() => import("./containers/Login"));
const ConfirmPageIconSetting = React.lazy(
  () => import("./containers/ConfirmPageIconSetting")
);

export const App = () => {
  const [finishedTutorial, setFinishedTutorial] = useLocalStorage(
    "finished_tutorial",
    false
  );
  const [confirmPageIcon, setConfirmPageIcon] = useLocalStorage<string | null>(
    "confirmPageIcon",
    null
  );
  const { lockTravelRecord, unlocked, currentTravelRecord } = useTravelRecord();
  const { pathname } = useLocation();

  const handleBlur = useCallback(() => {
    console.log(pathname);
    if (pathname !== "/qrReader" && pathname !== "/cameraSetting")
      lockTravelRecord();
  }, [lockTravelRecord, pathname]);

  useEffect(() => {
    console.log(adapter.browserDetails.browser, adapter.browserDetails.version);

    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, [handleBlur]);

  return (
    <Suspense fallback={<PageLoading />}>
      <GlobalStyle />
      <AnimatedSwitch>
        {!unlocked && (
          <Route exact path="/login">
            <Login />
          </Route>
        )}
        {!unlocked && <Redirect to="/login" />}
        {!finishedTutorial && (
          <Route exact path="/tutorial">
            <Tutorial setFinishedTutorial={setFinishedTutorial} />
          </Route>
        )}
        {!finishedTutorial && <Redirect to="/tutorial" />}
        <Route exact path="/">
          <MainScreen />
        </Route>
        <Route exact path="/confirm">
          {/* Don't split, to provide smooth transition between QR and confirm */}
          <Confirm
            confirmPageIcon={confirmPageIcon}
            currentTravelRecord={currentTravelRecord}
          />
        </Route>
        <Route exact path="/qrGenerator">
          <QRGenerator />
        </Route>
        <Route exact path="/disclaimer">
          <Disclaimer />
        </Route>
        <Route exact path="/qrReader">
          <QRReader />
        </Route>
        <Route exact path="/cameraSetting">
          <CameraSetting />
        </Route>
        <Route exact path="/confirmPageIcon">
          <ConfirmPageIconSetting
            confirmPageIcon={confirmPageIcon}
            setConfirmPageIcon={setConfirmPageIcon}
          />
        </Route>
        <Redirect to="/" />
      </AnimatedSwitch>
    </Suspense>
  );
};

const GlobalStyle = createGlobalStyle`
html {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  font-family: Rubik, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color:#12b188;
  width: 100%;
  height: 100%;
}

textarea {
  font-family: inherit;
}


#root {
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none;
}
`;
