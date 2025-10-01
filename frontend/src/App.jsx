import React from 'react';
import './index.css';

import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext';
import { useAuthContext } from './context/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages Import
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import VerifyEmail from './pages/auth/VerifyEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

// Student Pages Import
import Alumni from './pages/student/Alumni';
import Profile from './pages/student/Profile';
import Applications from './pages/student/Applications';
import SavedApplications from './pages/student/Savedapplications';
import ResumeBuilder from './pages/student/ResumeBuilder';
import DiscussionForum from './pages/student/DiscussionForum';
import AnalyticsDashboard from './pages/student/AnalyticsDashboard';

import Home from './pages/Home';
import Referrals from './pages/Referrals';
import Dashboard from './pages/Dashboard';

import AddThread from './components/DiscussionForum/AddThread';

// Admin Pages Imports
import AddAlumni from './pages/admin/AddAlumni';
import CreateJob from './pages/admin/CreateJob';
import AdminJobList from './pages/admin/AdminJobList';
import JobApplicants from './pages/admin/JobApplications';
import JobManagementPage from './pages/admin/JobManagementPage';


function App() {
  const { authUser } = useAuthContext();
  const { showForgotPassword, showVerifyEmail, showAddThread } = useAppContext();
  return (
    <>

      {showForgotPassword && <ForgotPassword />}
      {showVerifyEmail && <VerifyEmail />}
      {showAddThread && <AddThread />}


      <Routes>

        <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
        <Route path='/profile' element={authUser ? <Profile /> : <Navigate to='/login' />} />
        <Route path='/discussion-forum' element={authUser ? <DiscussionForum /> : <Navigate to='/login' />} />
        <Route path='/dashboard' element={authUser ? <Dashboard /> : <Navigate to='/login' />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup />} />
        <Route path='/analytics' element={<AnalyticsDashboard />} />
        <Route path='/referrals' element={<Referrals />} />
        <Route path='/resumebuilder' element={<ResumeBuilder />} />
        <Route path='/alumni' element={<Alumni />} />
        {!authUser && <Route path='/reset-password/:resetToken' element={<ResetPasswordPage />} />}
        <Route
          path="/admin/jobs"
          element={authUser?.role === "admin" ? <AdminJobList /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/manage-jobs"
          element={authUser?.role === "admin" ? <JobManagementPage /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/job/:jobId/applicants"
          element={authUser?.role === "admin" ? <JobApplicants /> : <Navigate to="/" />}
        />
        <Route
          path="/applications"
          element={
            authUser
              ? <Applications />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/saved-applications"
          element={
            authUser
              ? <SavedApplications />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/admin/create-job"
          element={authUser?.role === "admin" ? <CreateJob /> : <Navigate to="/" />}
        />
        {/* ALUMNI PAGES */}
        <Route
          path="/admin/add-alumni"
          element={authUser?.role === 'admin' ? <AddAlumni /> : <Navigate to='/' />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
