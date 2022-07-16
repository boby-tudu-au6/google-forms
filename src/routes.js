import React from "react";
import { Navigate, useRoutes } from 'react-router-dom'
import Layout from "layout";
import Home from 'pages/home/Home'
import Login from 'pages/auth/login/Login'
import Register from 'pages/auth/register/Register'
import NotFound from 'pages/notFound/NotFound'
import ForgotPassword from "pages/auth/forgot-password/ForgotPassword";
import ResetPassword from "pages/resetPassword/ResetPassword";

export function UserRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { element: <Home />, index: true },
        { path: '*', element: <Navigate to="/" /> },
      ]
    },
  ])
}
export function AuthRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
        { path: 'reset-password/:token', element: <ResetPassword /> },
        { path: '*', element: <NotFound /> },
      ]
    },
  ])
}