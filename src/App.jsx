import { useState } from "react";
import "./App.css";
import MainNavBar from "./components/MainNavBar";
import AuthContainer from "./components/AuthContainer";

function App() {
  // State to control which auth view is open, or null for none
  const [authView, setAuthView] = useState(null); // 'login' | 'register' | 'forgot' | null
  const [authMessage, setAuthMessage] = useState("");

  // Show AuthContainer only if authView is set
  return (
    <>
      <MainNavBar
        onLogin={() => setAuthView("login")}
        onRegister={() => setAuthView("register")}
      />
      {authView && (
        <div className="flex justify-center w-full mt-4">
          <AuthContainer
            view={authView}
            setView={setAuthView}
            message={authMessage}
            setMessage={setAuthMessage}
            onClose={() => setAuthView(null)}
          />
        </div>
      )}
    </>
  );
}

export default App;
