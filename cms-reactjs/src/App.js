import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ConferenceDetails from './components/ConferenceDetails';
import RegistrationForm from './components/RegistrationForm';
import AdminLogin from './components/AdminLogin';
import AddConference from './components/addConference';

function App() {
  return (
    <Router>
<Routes>
  <Route exact path="/" element={<HomePage />} />
  <Route path="/register/:id" element={<RegistrationForm />} />
  <Route path="/conference/:id" element={<ConferenceDetails />} />
  <Route path="/admin" element={<AdminLogin />} />
  <Route path="/addConference" element={<AddConference />} />
</Routes>    
</Router>
  );
}

export default App;