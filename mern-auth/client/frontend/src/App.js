import { useState, useEffect, createContext } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './styles/theme'
import Routes from './Routes'
import axios from 'axios'

export const UserContext = createContext({})

function App() {
  const [loading, setLoading] = useState(true)
  const [userSession, setUserSession] = useState(true)

  useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/isAuth', { withCredentials: true });
        setUserSession(response.data); // Directly use the data from the axios response
        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching auth', error);
        setLoading(false);
      }
    };
  
    fetchUserAuth();
  }, []);

  return (
    <UserContext.Provider value={userSession}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loading ? <>loading...</> : <Routes />}
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default App