import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './layouts/Layout';
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';
import ContactDetail from './pages/ContactDetail';
import EmptyState from './pages/EmptyState';
import './index.css';

// Wrapper to apply Layout to all child routes
const LayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutWrapper />}>
          <Route index element={<EmptyState />} />
          <Route path="contact/:id" element={<ContactDetail />} />
          <Route path="add" element={<AddContact />} />
          <Route path="edit/:id" element={<EditContact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
