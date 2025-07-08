import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navigation from './components/navigation/Navigation.jsx'
import { Box } from "@mui/material";
import UserProfile from "./pages/UserProfile.jsx";
import Authorization from "./pages/Authorization.jsx";
import Registration from "./pages/Registration.jsx";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import EditingProfile from "./pages/EditingProfile.jsx";
import BookCard from "./pages/BookCard.jsx";
import ListBooks from "./pages/ListBooks.jsx";
import {Provider} from "react-redux";
import { store, persistor } from "./redux/store.js";
import EditingBook from "./pages/EditingBook.jsx";
import { PersistGate } from 'redux-persist/integration/react';
import HomePage from "./pages/HomePage.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <BrowserRouter>
                  <Navigation />
                  <Box
                      sx={{
                          maxWidth: 1200,
                          width: '100%',
                          margin: '0 auto',
                          padding: { xs: 2, sm: 3 },
                          boxSizing: 'border-box'
                      }}
                  >
                      <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/UserProfile" element={<UserProfile/>} />
                          <Route path="/Authorization" element={<Authorization/>} />
                          <Route path="/Registration" element={<Registration/>} />
                          <Route path="/EditingProfile" element={<EditingProfile/>} />
                          <Route path="/ListBooks" element={<ListBooks/>} />
                          <Route path="/bookCard/:id" element={<BookCard/>} />
                          <Route path="/EditingBook" element={<EditingBook/>} />
                          <Route path="/EditingBooks/:id" element={<EditingBook/>} />
                          <Route path="/HomePage" element={<HomePage/>} />
                      </Routes>
                  </Box>
              </BrowserRouter>
          </PersistGate>
      </Provider>
  </StrictMode>
)
