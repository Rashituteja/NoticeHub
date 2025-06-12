import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import LandingPage from './landing_page/home/LandingPage';
import SignupPage from './landing_page/home/SignupPage';
import OldNotice  from './landing_page/home/OldNotice';
import Students from './landing_page/home/Students'
import LoginPage from './landing_page/home/LoginPage';
import AllNoices from './landing_page/home/AllNoices';
import Hero from './landing_page/home/Hero';
import NewNotice from './landing_page/NewNotice';
import Noticeview from './landing_page/home/Noticeview';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
  <BrowserRouter>
      <Routes>
         <Route path='/noticeview' element={<Hero/>}></Route>
         <Route path='/allnotice' element={<AllNoices/>}></Route>
         <Route path='/login' element ={<LoginPage/>}/>
         <Route path='/' element={<LandingPage/>}/>
         <Route path='/signup' element={<SignupPage/>}/>
         <Route path='/oldnotice' element={<OldNotice/>}/>
         <Route path='/newnotice' element={<NewNotice/>}/>
         <Route path="/students" element={<Students/>}/>
         <Route path="/noticeview/:id" element={<Noticeview />} />
      </Routes>
  
  </BrowserRouter>
);


reportWebVitals();
