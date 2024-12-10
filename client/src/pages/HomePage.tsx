import React from 'react';
import Nabar from '../components/NavBar';
import ChatPageWithProvider from './ChatPage';


const HomePage: React.FC = () => {
  return (
    <div className='w-[100%] h-screen overflow-hidden mx-auto text-white bg-gray-950'>
      <Nabar/>
      <ChatPageWithProvider />
    </div>
  );
};

export default HomePage;
