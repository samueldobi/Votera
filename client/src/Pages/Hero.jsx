import React from 'react';
import Button from '../Components/Button';
import { Shield, Zap, BarChart3, Globe, Lock, Timer, TrendingUp, Users, Sparkles, Vote, UserPlus, ArrowRight  } from 'lucide-react';

const Hero = () => {
  return (

      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 sm:py-24">
       <div className="">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Tagline with animated elements */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-orange-500 animate-spin" />
            <h2 className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent text-base font-bold tracking-wide uppercase animate-fade-in">
              Vote, Decide, Empower
            </h2>
            <Sparkles className="w-5 h-5 text-orange-500 animate-spin delay-300" />
          </div>

          {/* Main headline with gradient text */}
          <h1 className="mx-auto mt-4 max-w-4xl text-center font-bold tracking-tight text-balance animate-slide-up">
            <span className="block text-4xl sm:text-6xl lg:text-7xl mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Votera makes
              </span>
            </span>
            <span className="block text-4xl sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                online voting
              </span>
            </span>
            <span className="block text-2xl sm:text-4xl lg:text-5xl mt-4 text-gray-700 font-medium">
              easy, secure & accessible
            </span>
          </h1>

          {/* Subtitle with enhanced styling */}
          <p className="mx-auto mt-8 max-w-2xl text-center text-lg sm:text-xl text-gray-600 leading-relaxed animate-slide-up delay-200">
            Transform how your community makes decisions with our cutting-edge voting platform that prioritizes 
            <span className="font-semibold text-violet-600"> security</span>, 
            <span className="font-semibold text-blue-600"> simplicity</span>, and 
            <span className="font-semibold text-purple-600"> accessibility</span>.
          </p>

          {/* Enhanced CTA buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up delay-300">
            
            {/* Primary CTA */}
            <a 
              href="/vote"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-out min-w-[180px] justify-center"
            >
              <Vote className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-lg">Create Poll</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            {/* Secondary CTA */}
            <a 
              href="/register"
              className="group relative inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-2xl border-2 border-gray-200 hover:border-violet-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-out min-w-[180px] justify-center"
            >
              <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg">Register</span>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 animate-slide-up delay-500">
            <p className="text-sm font-medium text-gray-500 mb-6">Trusted by organizations worldwide</p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-600">256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
                <span className="text-sm font-medium text-gray-600">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-400"></div>
                <span className="text-sm font-medium text-gray-600">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 
    <div>
      {/* Hero Features */}
      <div className="mt-10 sm:mt-16 px-4 max-w-7xl mx-auto">
      <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-2">
        
        {/* Secure Voting - Large Card */}
        <div className="relative lg:row-span-2 group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden  transform group-hover:-translate-y-2 transition-all duration-500">
            
            {/* Header */}
            <div className="px-8 pt-8 pb-4 sm:px-10 sm:pt-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Secure Voting
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Military-grade encryption ensures every vote is protected and tamper-proof.
              </p>
            </div>

            {/* Visual Content */}
            <div className="flex-1 relative px-8 pb-8 sm:px-10">
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-inner overflow-hidden">
                {/* Animated Security Elements */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-16 h-16 border-2 border-emerald-400 rounded-full animate-ping"></div>
                  <div className="absolute bottom-6 right-6 w-12 h-12 border-2 border-teal-400 rounded-lg animate-pulse"></div>
                </div>
                
                {/* Lock Icon */}
                <div className="relative z-10 flex flex-col items-center justify-center h-64">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-30"></div>
                    <div className="relative bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full p-6">
                      <Lock className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-emerald-400 text-sm font-mono mb-2">256-bit Encryption</div>
                    <div className="flex items-center gap-2">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i < 6 ? 'bg-emerald-400' : 'bg-gray-600'} animate-pulse`} style={{animationDelay: `${i * 0.1}s`}}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fast & Easy */}
        <div className="relative max-lg:row-start-1 group">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden h-full transform group-hover:-translate-y-2 transition-all duration-500">
            
            <div className="px-8 pt-8 pb-4 sm:px-10 sm:pt-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Fast & Easy
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Vote in seconds from any device, anywhere.
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center px-8 pb-8 sm:px-10">
              <div className="relative">
                {/* Phone mockup */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl p-2 shadow-2xl">
                  <div className="bg-white rounded-2xl p-6 w-48 h-64">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Timer className="w-5 h-5 text-violet-500" />
                        <span className="text-xs font-semibold text-violet-600">3s</span>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-lg p-3">
                          <div className="w-full h-3 bg-violet-200 rounded animate-pulse"></div>
                        </div>
                        <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg p-3 text-white text-center font-semibold">
                          Vote Now
                        </div>
                        <div className="text-center">
                          <div className="inline-flex items-center gap-2 text-xs text-gray-500">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            Secure & Fast
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Results */}
        <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2 group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden h-full transform group-hover:-translate-y-2 transition-all duration-500">
            
            <div className="px-8 pt-8 pb-4 sm:px-10 sm:pt-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Live Results
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Watch real-time results unfold transparently.
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center px-8 pb-8">
              <div className="w-full max-w-xs">
                {/* Mini Chart */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Live Votes</span>
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full animate-pulse" style={{width: '65%'}}></div>
                        </div>
                        <span className="text-sm font-semibold text-blue-600">65%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full animate-pulse" style={{width: '35%'}}></div>
                        </div>
                        <span className="text-sm font-semibold text-purple-600">35%</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 text-center">Updating live...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accessible Anywhere */}
        <div className="relative lg:row-span-2 group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden  transform group-hover:-translate-y-2 transition-all duration-500">
            
            <div className="px-8 pt-8 pb-4 sm:px-10 sm:pt-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Accessible Anywhere
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Perfect for schools, teams, and communities globally.
              </p>
            </div>

            <div className="flex-1 relative px-8 pb-8 sm:px-10">
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 overflow-hidden min-h-[20rem]">
                {/* World Map Visualization */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>
                  <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-orange-400 rounded-full animate-ping delay-500"></div>
                  <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse delay-700"></div>
                </div>
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <div className="mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-30"></div>
                      <div className="relative bg-gradient-to-r from-orange-400 to-red-400 rounded-full p-4">
                        <Users className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center text-white space-y-2">
                    <div className="text-2xl font-bold">150+</div>
                    <div className="text-sm opacity-80">Countries Supported</div>
                    <div className="flex justify-center gap-2 mt-4">
                      {['🌍', '🌎', '🌏'].map((emoji, i) => (
                        <div key={i} className="text-2xl animate-bounce" style={{animationDelay: `${i * 0.2}s`}}>
                          {emoji}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    </div>
  </div>
  )
}

export default Hero