import logo from './logo.svg';
import './App.css';
import Gallery from './components/Gallery';
import Profile from './components/Profile';
import AboutUs from './components/AboutUs';
import { AppProvider } from './AppContext';
import ContactUs from './components/ContactUs';
import Navbar from './components/Navbar';
import * as React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';

import {Box, Stack} from "@mui/material"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import SystemOfQuestions from './components/SystemOfQuestions';
import Dashboard from './components/Dashboard';

const API = process.env.REACT_APP_API;
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri:API }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  const isAuthenticated = true; 

  const [value, setValue] = React.useState(0);
  return (
  <ApolloProvider client={client}>
    <AppProvider>
        <Box>
        <BrowserRouter>
        {/* <AppProvider> */}
          <Navbar  value={value} setValue={setValue}/>
        {/* </AppProvider> */}
          <Routes>
          {/* <AppProvider> */}
              <Route path="/" element={<Gallery/>}/>
            {/* </AppProvider> */}
            <Route path="/AboutUs" element={<AboutUs/>}/>
            <Route path="/ContactUs" element={<ContactUs/>}/>
            <Route path="/System" element={<SystemOfQuestions/>}/>
            <Route element={<PrivateRoute />}>
                  <Route path="/Profile"  element={<Profile/>} exact/>
                  <Route path="/Dashboard"  element={<Dashboard/>} exact/>
            </Route>
            {/* <Route path="/Profile"  element={<Profile/>}/> */}
          </Routes>
          </BrowserRouter>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
        
        </Stack>
  
    </Box>
    </AppProvider>
    </ApolloProvider>
  );
}

export default App;
