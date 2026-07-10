import { useState, lazy, Suspense } from 'react'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'

// loader
const Loader = lazy(() => import('./Components/Loader.jsx'))
// pages
const Homepage = lazy(() => import('./Pages/Homepage.jsx'))
const AboutUs = lazy(() => import('./Pages/AboutUs.jsx'))
const Events = lazy(() => import('./Pages/Events.jsx'))
const SponsorsC = lazy(() => import('./Pages/SponsorsC.jsx'))
const Members = lazy(() => import('./Pages/Members.jsx'))
// Events
const Regular = lazy(() => import('./Events/Regular.jsx'))
const Special = lazy(() => import('./Events/Special.jsx'))
const RegisterRun = lazy(() => import('./Events/RegisterRun.jsx'))
const ResultRun = lazy(() => import('./Events/ResultRun.jsx'))
const SpecialDesc = lazy(() => import('./Events/SpecialDesc.jsx'))
const PrivacyPolicy = lazy(() => import('./Components/PrivacyPolicy.jsx'))
const TermCondition = lazy(() => import('./Components/TermCondition.jsx'))


function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<Loader />}>
              <Homepage />
            </Suspense>
          } />
          <Route path="/about" element={
            <Suspense fallback={<Loader />}>
              <AboutUs />
            </Suspense>
          } />
          <Route path="/events" element={
            <Suspense fallback={<Loader />}>
              <Events />
            </Suspense>
          }>
            <Route path="regular" element={<Regular />}></Route>
            <Route path='special' element={<Special />}></Route>
          </Route>
          <Route path='/events/special/description' element={<SpecialDesc />}></Route>
          <Route path='/events/special/register' element={
            <Suspense fallback={<Loader />}>
              <RegisterRun />
            </Suspense>
          }></Route>
          <Route path='/events/special/results' element={
            <Suspense fallback={<Loader />}>
              <ResultRun />
            </Suspense>
          }></Route>
          <Route path='/members' element={
            <Suspense fallback={<Loader />}>
              <Members />
            </Suspense>
          }></Route>
          <Route path='/sponsors' element={
            <Suspense fallback={<Loader />}>
              <SponsorsC />
            </Suspense>
          }></Route>
          <Route path='/privacypolicy' element={
            <Suspense fallback={<Loader />}>
              <PrivacyPolicy />
            </Suspense>
          }></Route>
          <Route path='/termsconditions' element={
            <Suspense fallback={<Loader />}>
              <TermCondition />
            </Suspense>
          }></Route>

        </Routes>
      </HashRouter>
    </>
  )
}

export default App
