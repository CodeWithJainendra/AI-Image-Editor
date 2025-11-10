
import React from 'react';
import Header from './components/Header';
import ImageEditor from './components/ImageEditor';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        <ImageEditor />
      </main>
      <Footer />
    </div>
  );
};

export default App;
