import Main from "./Main";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/:client" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
