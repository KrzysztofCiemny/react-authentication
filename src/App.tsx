import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext';
import { Wrapper } from './components/Wrapper/Wrapper';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Wrapper />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
