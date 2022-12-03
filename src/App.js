import { Box, Grommet, Main } from 'grommet';
import theme from './theme';

import Login from "./components/page/login"
import Home from './components/page/home';

import HeaderBar from './components/organism/header-bar';


import {Routes, Route, BrowserRouter } from "react-router-dom"

// import { RentContextProvider, WithContext } from "./state/rentContext";
import {UserContextProvider, WithContext} from "./state/context";
import Blotter from './components/page/blotter';
import Create from './components/page/create';

const LoginComponent = () => {
  const WrappedLogin = WithContext(Login);
  return (
      <WrappedLogin />
  );
};

const HomeComponent = ()=>{
  const WrappedHome = WithContext(Home);
  return (<WrappedHome />)
}

const BlotterComponent = ()=>{
  const WrappedHome = WithContext(Blotter);
  return (<WrappedHome />)
}

const CreateComponent = ()=>{
  const WrappedHome = WithContext(Create);
  return (<WrappedHome />)
}

const HeaderComponent = ()=>{
  const WrappedHeader = WithContext(HeaderBar);
  return (<WrappedHeader />)
}

function App() {

  return (
    <Grommet theme={theme}>
      <UserContextProvider>
          <HeaderComponent />
          <Main>
            <Box margin="medium">
              <BrowserRouter>
                <Routes>
                  <Route exact path="/" element={<LoginComponent />} />
                  <Route path="/home" element={<HomeComponent />} />
                  <Route path="/blotter" element={<BlotterComponent />} />
                  <Route path="/create" element={<CreateComponent />} />
                </Routes>
              </BrowserRouter>
            </Box>
          </Main>
        </UserContextProvider>
    </Grommet>
  );
}

export default App;
