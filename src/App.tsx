import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext';
import { AppWrapper } from './components/Wrapper/AppWrapper';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppWrapper />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
