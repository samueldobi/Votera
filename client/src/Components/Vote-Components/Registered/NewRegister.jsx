import * as React from 'react';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';


const NewRegister = ({text}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="relative">
        {/* Floating decoration elements */}
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-10 animate-pulse delay-700"></div>
        
        {/* Main card */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 max-w-md w-full mx-auto transform hover:scale-105 transition-all duration-500 ease-out">
          {/* Success icon with animation */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-ping opacity-30"></div>
              <div className="relative bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full p-4 shadow-lg">
                <CheckCircle className="w-12 h-12 text-white animate-bounce" />
              </div>
            </div>
          </div>

          {/* Title with gradient text */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4 animate-fade-in">
              Congratulations!
            </h1>
            
            {/* Sparkle decoration */}
            <div className="flex justify-center items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-violet-400 animate-spin" />
              <div className="h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent w-24"></div>
              <Sparkles className="w-5 h-5 text-cyan-400 animate-spin delay-500" />
            </div>

            {/* User text */}
            {text && (
              <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-4 animate-slide-up">
                {text}
              </p>
            )}

            {/* Success message */}
            <p className="text-xl text-slate-600 font-medium leading-relaxed animate-slide-up delay-200">
              You have successfully registered! 🎉
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a 
              href="/login" 
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <span className="text-lg">Continue to Login</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Subtle bottom decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 rounded-full"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
  //   <Card sx={{ minWidth: 40 }} className='sm:mx-auto sm:w-full sm:max-w-sm card-register'>
  //   <CardContent>
  //     <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 50 }}>
  //       Congratulations
  //     </Typography>
  //     <p className='text-2xl text-red-600' >{text}</p>
  //     <p className='text-2xl'>You have successfully Registered</p>
  //   </CardContent>
  //   <CardActions className='flex justify-center'>
  //     <a href="/login" className='orange-color text-xl'>
  //      Login
  //     </a>
  //   </CardActions>
  // </Card>
  
}

export default NewRegister