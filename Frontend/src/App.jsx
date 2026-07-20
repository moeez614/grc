import { useState, lazy, Suspense } from 'react'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
// Routes
const ProtectedRoute = lazy(() => import('./Routes/ProtectedRoute.jsx'))
// loader
const Loader = lazy(() => import('./Components/Loader.jsx'))
// pages
const Homepage = lazy(() => import('./Pages/Homepage.jsx'))
const AboutUs = lazy(() => import('./Pages/AboutUs.jsx'))
const Events = lazy(() => import('./Pages/Events.jsx'))
const SponsorsC = lazy(() => import('./Pages/SponsorsC.jsx'))
const Members = lazy(() => import('./Pages/Members.jsx'))
const Login = lazy(() => import('./Pages/Login.jsx'))
const Dashboard = lazy(() => import('./Pages/Dashboard.jsx'))
// Events
const Regular = lazy(() => import('./Events/Regular.jsx'))
const Special = lazy(() => import('./Events/Special.jsx'))
const RegisterRun = lazy(() => import('./Events/RegisterRun.jsx'))
const ResultRun = lazy(() => import('./Events/ResultRun.jsx'))
const SpecialDesc = lazy(() => import('./Events/SpecialDesc.jsx'))
// Components
const PrivacyPolicy = lazy(() => import('./Components/PrivacyPolicy.jsx'))
const TermCondition = lazy(() => import('./Components/TermCondition.jsx'))
// Layout
const MembersManagement = lazy(() => import('./Layouts/MemberManagement.jsx'))
const SponsorManagement = lazy(() => import('./Layouts/SponsorManagement.jsx'))
const EventManagement = lazy(() => import('./Layouts/EventManagement.jsx'))
const AnnualEvents = lazy(() => import('./Layouts/AnnualEvents.jsx'))
const WeeklyEvents = lazy(() => import('./Layouts/WeeklyEvents.jsx'))
const Attendence = lazy(() => import('./Layouts/Attendence.jsx'))

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
          {/*================ login page ============ */}
          <Route path='/login' element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }></Route>
          {/* ================= dashboard page ============ */}
          <Route path='/dashboard' element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Suspense>
          }>
            <Route path='membermanagement' element={
              <Suspense fallback={<Loader />}>
                <MembersManagement />
              </Suspense>
            } ></Route>
            <Route path='sponsors-management' element={<SponsorManagement />} ></Route>
            <Route path='event-management' element={<EventManagement />} >
              <Route path='weekly-events' element={<WeeklyEvents />}></Route>
              <Route path='annual-events' element={<AnnualEvents />}></Route>
            </Route>
            <Route path='attendence-management' element={<Attendence />}></Route>

          </Route>

        </Routes>
      </HashRouter>
    </>
  )
}

export default App
