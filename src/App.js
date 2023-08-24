import { Routes, Route } from 'react-router-dom';

// Components
import Login from './components/Login';
import Chats from './components/Chats';

// Contexts
import AuthContextProvider from './contexts/AuthContextProvider';

function App() {
   return (
      <div className="App">
         <AuthContextProvider>
            <Routes>
               <Route path="/chats" element={<Chats />} />
               <Route path="/" element={<Login />} />
            </Routes>
         </AuthContextProvider>
      </div>
   );
}

export default App;
