import React,{PureComponent} from 'react';
import Dashboard from './Components/Dashboard/Dashboard'
import Header from './Components/Header/Header'
import Auth from './Components/Auth/Auth'
import Home from './Components/Home/Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import JobPostModal from './Components/JobPostModal/JobPostModal';
import './App.css';


const getRoutes = () => [
  {
    path: "/login",
    component: Auth,
    protected: false,
    title: 'Dashboard',
    key: 'login-page',
    exact: true,
  },
  {
    path: "/post-job",
    component: JobPostModal,
    protected: true,
    title: 'Post Your Job',
    key: 'post-job-page',
    exact: true,
  },
  {
    path: "/Home",
    component: Home,
    protected: true,
    title: 'Home',
    key: 'home-page',
    exact: true,
  },
  {
    path: "/",
    component: Dashboard,
    protected: false,
    title: 'Dashboard',
    key: 'dashboard-page',
    exact: true,
  },
];
function App() {
  const [isUserAuthenticated,setUserAuthenticated] = React.useState(false);
  return (
    <div className="App">
      <div className='firsthalf'>
        <Router>
          <Switch>
            <>
              <Header isUserAuthenticated={isUserAuthenticated}/>
              {getRoutes().map(route => {
                if (route.protected) {
                  return (
                    <ProtectedRoutes
                      key={route.key}
                      {...route}
                    />
                  );
                }
                else{
                 return <Route exact={route.exact} key={route.key} {...route}/>
                }
               
              }
              )}

            </>
          </Switch>
        </Router>
        {/* <BrowserRouter> 
              <Route path="/" element={ <Auth/>}  />
              <Route path="/dashboard" element={<Dashboard />}  />
           
            </BrowserRouter> */}
        {/* <Auth/>
      <Dashboard/> */}
   <div className='footer'></div>
      </div>
    </div>
  );
}

export default App;
