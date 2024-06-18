import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersList from './components/UsersList';
import UserDetail from './components/UserDetails';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import DeleteUser from './components/DeleteUser';
import AccommodationsList from "./components/AccomodationList";
import AddAccommodation from "./components/AddAccomodation";
import AccommodationDetail from "./components/AccomodationDetail";
import EditAccommodation from "./components/EditAccomodation";
import DeleteAccommodation from "./components/DeleteAccomodation";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/users/:id/edit" element={<EditUser />} />
            <Route path="/users/:id/delete" element={<DeleteUser />} />
            <Route path="/accommodations" element={<AccommodationsList />} />
            <Route path="/accommodations/add" element={<AddAccommodation />} />
            <Route path="/accommodations/:id" element={<AccommodationDetail />} />
            <Route path="/accommodations/:id/edit" element={<EditAccommodation />} />
            <Route path="/accommodations/:id/delete" element={<DeleteAccommodation />} />
        </Routes>
      </Router>
  );
}

export default App;
