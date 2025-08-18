import React from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';

const Hero = () => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="min-h-screen flex items-center relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>

            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    <div className="space-y-8">

                        <div className="inline-flex items-center px-4 py-2 bg-white/50 rounded-full border border-gray-200 backdrop-blur-sm">
                            <Star className="w-4 h-4 text-yellow-500 mr-2" />
                            <span className="text-sm font-medium text-gray-700">#1 Rated Platform</span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                            <span className="text-gray-900">Transform Your</span>
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                Digital Vision
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                            Empower your business with cutting-edge technology solutions that drive growth,
                            innovation, and success in the digital age.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                                <span className="font-semibold">Get Started Today</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => scrollToSection('about')}
                                className="group bg-white/80 text-gray-700 px-8 py-4 rounded-full border border-gray-200 hover:bg-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm"
                            >
                                <Play className="w-5 h-5" />
                                <span className="font-semibold">Watch Demo</span>
                            </button>
                        </div>

                        <div className="flex items-center space-x-8 pt-8">
                            <div>
                                <div className="text-3xl font-bold text-gray-900">50K+</div>
                                <div className="text-sm text-gray-600">Happy Clients</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900">99.9%</div>
                                <div className="text-sm text-gray-600">Uptime</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900">24/7</div>
                                <div className="text-sm text-gray-600">Support</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative z-10">
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-900">Dashboard Overview</h3>
                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl p-4">
                                            <div className="text-sm text-blue-600 font-medium">Revenue Growth</div>
                                            <div className="text-2xl font-bold text-blue-900">+142%</div>
                                        </div>

                                        <div className="bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl p-4">
                                            <div className="text-sm text-purple-600 font-medium">User Engagement</div>
                                            <div className="text-2xl font-bold text-purple-900">89.5%</div>
                                        </div>

                                        <div className="bg-gradient-to-r from-indigo-100 to-indigo-50 rounded-xl p-4">
                                            <div className="text-sm text-indigo-600 font-medium">Performance Score</div>
                                            <div className="text-2xl font-bold text-indigo-900">A+</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-80 animate-bounce"></div>
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-80 animate-bounce animation-delay-2000"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;