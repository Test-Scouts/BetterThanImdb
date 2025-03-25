import "./App.css";
import Header from "./components/Header";

function App() {
  const appName: String = "BetterThanIMDB";

  return (
    <>
      <Header appName={appName} />
    </>
  );
}

export default App;
