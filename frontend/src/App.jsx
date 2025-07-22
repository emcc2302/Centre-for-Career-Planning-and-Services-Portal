import React from 'react';
import './index.css';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Referrals from './pages/Referrals';
import ResumeBuilder from './pages/ResumeBuilder';
import ResetPasswordPage from './pages/ResetPasswordPage';

import {Routes, Route, Navigate } from 'react-router-dom';

import { useAuthContext } from './context/AuthContext';
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext';
import ForgotPassword from './components/ForgotPassword';
import VerifyEmail from './components/VerifyEmail';
import DiscussionForum from './pages/DiscussionForum';
import AddThread from './components/AddThread';
import Profile from './pages/Profile';
import Alumni from './pages/Alumni';
import AdminJobList from './pages/admin/AdminJobList';
import JobApplicants from './pages/admin/JobApplications';
import Applications from './pages/Applications';
import CreateJob from './pages/admin/CreateJob';
import AddAlumni from './pages/admin/AddAlumni';

function App() {
  const { authUser } = useAuthContext();
  const {showForgotPassword, showVerifyEmail, showAddThread} = useAppContext();
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
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login/>}/>
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup/>}/>
        <Route path='/analytics' element={<AnalyticsDashboard/>}/>
        <Route path='/referrals' element={<Referrals/>}/>
        <Route path='/resumebuilder' element={<ResumeBuilder/>} />
        <Route path='/alumni' element={<Alumni/>} />
        {!authUser && <Route path='/reset-password/:resetToken' element={<ResetPasswordPage />} />}
        <Route
          path="/admin/jobs"
          element={authUser?.role === "admin" ? <AdminJobList /> : <Navigate to="/" />}
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
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route
          path="/admin/create-job"
          element={authUser?.role === "admin" ? <CreateJob /> : <Navigate to="/" />}
        />
        {/* ALUMNI PAGES */}
        <Route
          path="/add-alumni"
          element={authUser?.role ==='admin'? <AddAlumni/>:<Navigate to ='/'/>}
        />
      </Routes>
      
      <Toaster />
    </>
  );
}

export default App;
