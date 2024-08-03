import ClientList from '@/components/InfoClientesComponents/ClienteComponents';
import React from 'react';
import dotenv from 'dotenv';
dotenv.config(); 

const Home: React.FC = () => {
  return (
    <div>
      <ClientList/>
    </div>
  );
};

export default Home;
