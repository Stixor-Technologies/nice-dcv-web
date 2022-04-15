import { useState, useEffect } from "react";
import { DCVViewer } from "../../dcv-ui/dcv-ui";
import dcv from "../../public/dcvjs/dcv";

function DCVViewerComponent() {
  const [authenticated, setAuthenticated] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [credentials, setCredentials] = useState({});

  const LOG_LEVEL = dcv.LogLevel.INFO;
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const BASE_URL = "/dcvjs";

  let auth;

  const onSuccess = (_, result) => {
    var { sessionId, authToken } = { ...result[0] };

    console.log("Authentication successful.");
    console.log(sessionId, authToken);

    setSessionId(sessionId);
    setAuthToken(authToken);
    setAuthenticated(true);
    setCredentials({});
  };

  function onPromptCredentials(auth, challenge) {
    // Let's check if in challege we have a username and password request
    if (
      challengeHasField(challenge, "username") &&
      challengeHasField(challenge, "password")
    ) {
      auth.sendCredentials({
        username: process.env.NEXT_PUBLIC_USERNAME,
        password: process.env.NEXT_PUBLIC_PASSWORD,
      });
    } else {
      // Challenge is requesting something else...
    }
  }

  function challengeHasField(challenge, field) {
    return challenge.requiredCredentials.some(
      (credential) => credential.name === field
    );
  }

  const authenticate = () => {
    console.log(
      "Using NICE DCV Web Client SDK version " + dcv.version.versionStr
    );
    console.log("Starting authentication with ", SERVER_URL);
    dcv.setLogLevel(LOG_LEVEL);

    auth = dcv.authenticate(SERVER_URL, {
      promptCredentials: onPromptCredentials,
      error: onError,
      success: onSuccess,
    });
  };

  const updateCredentials = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const submitCredentials = (e) => {
    auth.sendCredentials(credentials);
    e.preventDefault();
  };

  useEffect(() => {
    if (!authenticated) {
      authenticate();
    }
  }, [authenticated]);

  const handleDisconnect = (reason) => {
    console.log(
      "Disconnected: " + reason.message + " (code: " + reason.code + ")"
    );
    auth.retry();
    setAuthenticated(false);
  };

  return authenticated ? (
    <div style={{ height: "100%" }}>
      <DCVViewer
        dcv={{
          sessionId: sessionId,
          authToken: authToken,
          serverUrl: SERVER_URL,
          baseUrl: BASE_URL,
          onDisconnect: handleDisconnect,
          logLevel: LOG_LEVEL,
        }}
        uiConfig={{
          toolbar: {
            visible: true,
            fullscreenButton: true,
            multimonitorButton: true,
          },
        }}
      />
    </div>
  ) : (
    <div
      style={{
        height: window.innerHeight,
        backgroundColor: "#373737",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form>
        <fieldset>
          {Object.keys(credentials).map((cred) => (
            <input
              key={cred}
              name={cred}
              placeholder={cred}
              type={cred === "password" ? "password" : "text"}
              onChange={updateCredentials}
              value={credentials[cred]}
            />
          ))}
        </fieldset>
        <button type="submit" onClick={submitCredentials}>
          Login
        </button>
      </form>
    </div>
  );
}

const onError = (_, error) => {
  console.log("Error during the authentication: " + error.message);
};

export default DCVViewerComponent;
