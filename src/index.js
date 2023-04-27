import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from "./store"
import { Provider } from 'react-redux';
import { fetchPosts } from './store/slices/post/postSlice';
import { fetchUsers } from './store/slices/users/usersSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

store.dispatch(fetchUsers())
store.dispatch(fetchPosts())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />}/>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);


