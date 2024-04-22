import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AuthContextProvider } from './context/authContext';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { Navigation } from './components/navigation/Navigation';
import { Private } from './pages/PrivatePage';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/private" element={<Private />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
