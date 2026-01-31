import React from 'react';
import Header from '../(root)/_components/Header';


export default function PricingPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-b from-gray-900 to-gray-950">
            <Header />
            
            <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 ">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-400 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Simple Pricing
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                        Currently <span className="font-bold text-green-600">FREE</span> for all users
                    </p>
                </div>

                <div className="mt-12 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-400 text-center">
                            Free Access to All Features
                        </h2>
                        <p className="mt-4 text-gray-500 text-center">
                            We are currently offering free access to all our features including all available languages.
                        </p>
                        
                        <div className="mt-8">
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-base text-gray-700 dark:text-gray-400">Access to all programming languages</p>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-base text-gray-700 dark:text-gray-400">Unlimited projects</p>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-base text-gray-700 dark:text-gray-400">Full feature access</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="px-6 pt-6 pb-8 bg-gray-50 dark:bg-gray-900">
                        <div className="mt-6">
                            <button
                                type="button"
                                className="block w-full bg-blue-600 py-3 px-4 rounded-md shadow text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Start Using Now - Free!
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}