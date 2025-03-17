import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Screens/Home";
import ProtectedRoute from "../src/ProtectedRoute";
import Notes from "./Notes/Notes";
import AllUsers from "./Screens/Users/AllUsers";

function App() {
  const token = localStorage.getItem("userData");
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AllUsers />} />
          <Route
            path="/home"
            element={token ? <Navigate to="/notes" replace /> : <Home />}
          />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
