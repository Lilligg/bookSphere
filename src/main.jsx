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
import { store } from "./redux/store.js";
import EditingBook from "./pages/EditingBook.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <Navigation />
              <Box sx={{ maxWidth: 1200, width: '100%', margin: '0 auto', padding: 3 }}>
                  <Routes>
                      <Route path="/UserProfile" element={<UserProfile/>} />
                      <Route path="/Authorization" element={<Authorization/>} />
                      <Route path="/Registration" element={<Registration/>} />
                      <Route path="/EditingProfile" element={<EditingProfile/>} />
                      <Route path="/ListBooks" element={<ListBooks/>} />
                      <Route path="/bookCard/:id" element={<BookCard/>} />
                      <Route path="/EditingBook" element={<EditingBook/>} />
                  </Routes>
            </Box>
          </BrowserRouter>
      </Provider>
  </StrictMode>
)
