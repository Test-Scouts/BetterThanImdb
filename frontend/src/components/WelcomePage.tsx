import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleInteraction = () => {
      navigate('/BetterThanIMDB');
    };

    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('click', handleInteraction);

    return () => {
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex items-center justify-center overflow-hidden">
      <div className="text-center px-6 max-w-4xl">
        {/* Greeting*/}
        <h1 className="text-8xl md:text-9xl font-thin tracking-[-0.02em] text-white mb-4 leading-none">
          Hey Gorgeous!
        </h1>
        
        {/* Info Text */}
        <div className="inline-flex items-center space-x-3 text-gray-100 group cursor-pointer transition-all duration-500 hover:text-white">
          <div className="h-px w-12 bg-gray-100 group-hover:w-16 transition-all duration-500"></div>
          <span className="text-sm font-light tracking-[0.2em] uppercase">
            Press any key to go to BetterThanIMDB
          </span>
          <svg 
            className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
           <path 
             strokeLinecap="round" 
             strokeLinejoin="round" 
             strokeWidth={1.5} 
             d="M9 5l7 7-7 7" 
           />
         </svg>
        </div>
      </div>
      
      {/* Signature of MY - Bottom center */}
      <div className="fixed bottom-12 left-0 right-0 flex justify-center">
        <p className="text-xl md:text-2xl font-light text-gray-400 tracking-wide">
          Designed by Mert Yurdakul, Gothenburg, 2025
        </p>
      </div>
    </div>
  );
}
