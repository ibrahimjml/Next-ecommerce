"use client"
import {createContext,useEffect,useState } from "react"
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme'; 

export const ThemeContext = createContext()
export const ThemeProvider = ({children}) => {
  const [mode, setMode] = useState(null)

  useEffect(() => {
      const savedMode = localStorage.getItem('themeMode') || 'light';
      setMode(savedMode);
  }, []);

  const toggle =()=>{
    setMode(prev => (prev === "dark" ? "light" : "dark"))
  }
  
  const theme = mode === 'dark' ? darkTheme : lightTheme; 
  
  useEffect(() => {
    if (mode) {  
      localStorage.setItem('themeMode', mode);
      document.body.className = mode;
    }
  }, [mode]);

  if (mode === null) return null;

  return(
    <MUIThemeProvider theme={theme}> 
    <ThemeContext.Provider value= {{ mode ,toggle}}>
    {children}
  </ThemeContext.Provider>
  </MUIThemeProvider>
  )
}