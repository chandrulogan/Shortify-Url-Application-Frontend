import React from 'react';
import Header from './Components/Header';
import './Styles/GlobalStyles.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import VerifyOtp from './Pages/ForgotPassword/VerifyOtp/VerifyOtp';
import NewPassword from './Pages/ForgotPassword/NewPassword/NewPassword';
import Dashboard from './Pages/Dashboard/Dashboard';
import ViewUrl from './Pages/ViewUrl/ViewUrl';
import CreateNewUrl from './Pages/CreateNewUrl/CreateNewUrl';
import PrivateRoutes from './Utils/PrivateRoute';
import ProjectInfo from './Pages/ProjectInfo/ProjectInfo';

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/shortify/dashboard' element={<Dashboard />} />
          <Route path='/shortify/dashboard/:id' element={<ViewUrl />} />
          <Route path='/shortify/dashboard/shortern-new-url' element={<CreateNewUrl />} />
        </Route>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/project-Info' element={<ProjectInfo/>}/>
        <Route path='/shortify/sign-up' element={<SignUp/>}/>
        <Route path='/shortify/reset-password' element={<ForgotPassword/>}/>
        <Route path='/shortify/reset-password/verify-otp' element={<VerifyOtp/>}/>
        <Route path='/shortify/reset-password/new-password' element={<NewPassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
