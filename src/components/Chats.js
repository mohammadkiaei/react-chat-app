import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import axios from 'axios';

// Components
import Navbar from './Navbar';

// Styles
import styles from './Chats.module.css';

// Context
import { AuthContext } from '../contexts/AuthContextProvider';

const Chats = () => {
   const [loading, setLoading] = useState(true);
   const user = useContext(AuthContext);
   const navigate = useNavigate();

   useEffect(() => {
      if (!user) {
         navigate('/');
         return;
      }

      axios
         .get('https://api.chatengine.io/users/me', {
            headers: {
               'project-id': 'bfa60608-2db7-4a62-ab5c-90faaf033c50',
               'user-name': user.email,
               'user-secret': user.uid,
            },
         })
         .then(() => {
            setLoading(false);
         })
         .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);
            getFile(user.photoURL).then((avatar) => {
               formdata.append('avatar', avatar, avatar.name);
               axios
                  .post('https://api.chatengine.io/users/', formdata, {
                     headers: {
                        'private-key': 'cdfb59bb-840b-418d-91ab-9ec4ddf122ac',
                     },
                  })
                  .then(() => setLoading(false))
                  .catch((error) => console.log(error));
            });
         });
   }, [user, navigate]);

   const getFile = async (url) => {
      const response = await fetch(url);
      const data = await response.blob();
      return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
   };

   const logoutHandler = async () => {
      await auth.signOut();
      navigate('/');
   };

   if (!user || loading) return 'Loading...';

   return (
      <div className={styles.container}>
         <Navbar logoutHandler={logoutHandler} />

         <ChatEngine height="calc(100vh - 50px)" projectID="bfa60608-2db7-4a62-ab5c-90faaf033c50" userName={user.email} userSecret={user.uid} />
      </div>
   );
};

export default Chats;
