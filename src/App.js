import  '../src/App.css'
import React , {lazy , Suspense} from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/auth/signup/SignUp"));
const SignIn = lazy(() => import("./pages/auth/signin/SignIn"));


function App() {
  return (
<>
<BrowserRouter>
      <Suspense fallback =  { <h1>Page Loading, Please hold on ...</h1>}>
        <section className='app'>
            <Routes>
                <Route exact path = "/" element = {<Home/>} />
                <Route path = "/signup" element = {<SignUp/>} />
               <Route path = "/signin" element = {<SignIn/>} /> 
            </Routes>
        </section>
      </Suspense>
</BrowserRouter>
<ToastContainer/> 
</>
  );
}

export default App;
