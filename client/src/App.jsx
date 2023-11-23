/**
 * Project Name: AI CHATBOT
 * Description: AI powered chatbot with whm you can practise speaking skills.
 *
 * Author: Mariusz Gruszczynski
 * Email: mario.gruszczynski@gmail.com
 * Date: 14th September 2023
*/

import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Snackbar from "./components/Snackbar/Snackbar";

const Home = lazy(() => import("./pages/Home"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
      refetchOnmount: false,
      refetchOnReconnect: false,
      //staleTime: 1000 * 60 * 5 
    },
  },
});

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* page not found */}
          <Route path="*" element={<PageNotFound />} />
      
        </Routes>
        <Snackbar />
      </Suspense>

    </QueryClientProvider>
  )
}

export default App
