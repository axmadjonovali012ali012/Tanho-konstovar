import React from 'react';
import {
    Zap,
    Shield,
    Globe,
    Smartphone,
    BarChart3,
    Headphones,
    ArrowRight,
    CheckCircle
} from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Experience blazing-fast performance with our optimized infrastructure and advanced caching.',
            gradient: 'from-yellow-400 to-orange-500'
        },
        {
            icon: Shield,
            title: 'Enterprise Security',
            description: 'Bank-level security with end-to-end encryption and advanced threat protection.',
            gradient: 'from-green-400 to-blue-500'
        },
        {
            icon: Globe,
            title: 'Global Reach',
            description: 'Connect with audiences worldwide through our global CDN and multi-region support.',
            gradient: 'from-blue-400 to-purple-500'
        },
        {
            icon: Smartphone,
            title: 'Mobile First',
            description: 'Perfectly optimized for mobile devices with responsive design and native apps.',
            gradient: 'from-purple-400 to-pink-500'
        },
        {
            icon: BarChart3,
            title: 'Advanced Analytics',
            description: 'Get deep insights with real-time analytics and comprehensive reporting tools.',
            gradient: 'from-indigo-400 to-cyan-500'
        },
        {
            icon: Headphones,
            title: '24/7 Support',
            description: 'Round-the-clock expert support to help you succeed at every step of your journey.',
            gradient: 'from-pink-400 to-red-500'
        }
    ];

    const benefits = [
        'Increase productivity by 300%',
        'Reduce operational costs significantly',
        'Scale effortlessly as you grow',
        'Improve customer satisfaction'
    ];

    return (
        <section id="features" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Powerful Features That
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Drive Results</span>
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Discover the comprehensive suite of tools and capabilities designed to transform
                        your business operations and accelerate your success.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-gray-200 transform hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {feature.description}
                                </p>

                                <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all duration-300">
                                    <span>Learn More</span>
                                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">
                                Why Leading Companies Choose Us
                            </h3>
                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                                        <span className="text-lg text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-gray-900 mb-2">10,000+</div>
                                <div className="text-gray-600 mb-6">Companies trust our platform</div>

                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">99.9%</div>
                                        <div className="text-sm text-gray-500">Uptime SLA</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-purple-600">5★</div>
                                        <div className="text-sm text-gray-500">Customer Rating</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;