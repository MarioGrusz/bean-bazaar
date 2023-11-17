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

const Home = lazy(() => import("./pages/Home"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
      refetchOnmount: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 5 
    },
  },
});

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>

      <Routes>

        {/* public routes */}
        <Route path="/" element={<Home />} />

        {/* protected routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* page not found */}

      </Routes>

    </QueryClientProvider>
  )
}

export default App
