import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LayoutPage from "./pages/LayoutPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route 
        path="/layout" 
        element={
          <ProtectedRoute>
            <LayoutPage  />
          </ProtectedRoute>
        } />
    </Routes>
  )
}

export default App
