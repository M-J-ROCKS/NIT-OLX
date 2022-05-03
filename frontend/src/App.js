import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import MyAds from './screens/MyAds/MyAds';
import CreateAd from './screens/createAd/CreateAd';
import UpdateAd from './screens/createAd/UpdateAd';
import AdScreen from './screens/AdScreen/AdScreen';
import ChatScreen from './screens/ChatScreen/ChatScreen';
import MyRequestsScreen from './screens/MyRequestsScreen/MyRequestsScreen';
import LoginScreen2 from './screens/LoginScreen/LoginScreen2';
import ContactUs from './screens/ContactUs/ContactUs';

function App() {
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState([]);
  // console.log(search);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <BrowserRouter>
      {userInfo&&<Header setSearch={setSearch}/>}
      <Route path='/' component={LandingPage} exact/>
      <Route path='/login' component={LoginScreen} />
      <Route path='/login2' component={LoginScreen2} />
      <Route path='/register' component={RegisterScreen} />
      {/* <Route path='/home' component={HomeScreen} /> */}
      <Route path='/myads' component={MyAds} />
      <Route path='/createad' component={CreateAd} />
      <Route path='/ad/:id' component={AdScreen} />
      <Route path='/contactUs' component={ContactUs} />
      <Route path='/myrequests' component={({ history }) => (
          <MyRequestsScreen search={search} history={history} />
        )} />
      <Route
        path="/home"
        component={({ history }) => (
          <HomeScreen search={search} history={history} />
        )}
      />
      {/* <Route
        path="/mynotes"
        component={({ history }) => (
          <MyNotes search={search} history={history} />
        )}
      /> */}
      <Route path='/updatead/:id' component={UpdateAd} />
      <Route path='/profile' component={ProfileScreen} />
      <Route path='/chat' component={ChatScreen} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
