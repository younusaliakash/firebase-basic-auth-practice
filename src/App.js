import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

// if(firebase.app.length === 0){
//   firebase.initializeApp(firebaseConfig)
// }

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  }

function App() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const [user,setUser] = useState({
    isSignIn : false,
    name : '',
    email : '',
    photo : ''
  })

  const handleSignIn = () =>{
    firebase.auth()
    .signInWithPopup(provider)
    .then( res => {
      const {displayName, email, photoURL} = res.user;
      const userSignIn ={
        isSignIn : true,
        name : displayName,
        email : email,
        photo : photoURL
      }
      setUser(userSignIn);
    })
  }

  const handleSignOut = () =>{
      const userSignOut ={
        isSignIn : false,
        name : '',
        email : '',
        photo : ''
      }
      setUser(userSignOut);
    }
  
  return (
    <div className="App">
      {
        user.isSignIn ? <button onClick={handleSignOut} >Sign Out</button> : <button onClick={handleSignIn} >Sign In</button>
      }
      {
        user.isSignIn && <div>
          <p>Dev Akash Authentication System Test</p>
         <p> Welcome , {user.name}</p>
         <img src={user.photo} alt=""/>
        </div>
      }
      
    </div>
  );
}

export default App;
