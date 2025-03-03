// src/router/index.tsx
import { 
    createBrowserRouter, 
    createRoutesFromElements,
    Route,
    RouterProvider,
    LoaderFunctionArgs
  } from "react-router-dom";
  import {
    SignIn,
    SignUp,
    Dashboard,
    Teachers,
    Setting
  } from "@modules";
  import App from "../App";
  import Spinner from "../components/spinner"; // Spinner komponentini import qilamiz
import React from "react";
  
  // Loading holatini simulyatsiya qilish uchun loader
  const pageLoader = async ({ }: LoaderFunctionArgs) => {
    // 500ms davomida fake loading simulyatsiyasi (spinner’ni ko‘rsatish uchun)
    await new Promise(resolve => setTimeout(resolve, 500));
    return null; // Hech qanday ma’lumot qaytarmaydi
  };
  
  const Index = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<App />}>
          <Route 
            index 
            element={
              <React.Suspense fallback={<Spinner />}>
                <SignIn />
              </React.Suspense>
            } 
            loader={pageLoader}
          />
          <Route 
            path="sign-up" 
            element={
              <React.Suspense fallback={<Spinner />}>
                <SignUp />
              </React.Suspense>
            } 
            loader={pageLoader}
          />
          <Route 
            path="main/*" 
            element={
              <React.Suspense fallback={<Spinner />}>
                <Dashboard />
              </React.Suspense>
            } 
            loader={pageLoader}
          >
            <Route 
              index 
              element={
                <React.Suspense fallback={<Spinner />}>
                  <Teachers />
                </React.Suspense>
              } 
              loader={pageLoader}
            />
            <Route 
              path="setting" 
              element={
                <React.Suspense fallback={<Spinner />}>
                  <Setting />
                </React.Suspense>
              } 
              loader={pageLoader}
            />
          </Route>
        </Route>
      )
    );
    return <RouterProvider router={router} />;
  };
  
  export default Index;