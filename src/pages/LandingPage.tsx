import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Clock, BarChart2, ArrowRight, Code2, Brain } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="absolute flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white">
      <Icon className="h-6 w-6" />
    </div>
    <div className="ml-16">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  </motion.div>
);

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-10 sm:mt-12 lg:mt-16 xl:mt-20"
            >
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Advanced CPU Scheduling</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Simulator & Visualizer
                  </span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Experience real-time visualization of CPU scheduling algorithms. Perfect for learning
                  operating system concepts with interactive simulations and comprehensive analysis.
                </p>
                <motion.div
                  className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/simulator"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Launch Simulator
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Comprehensive CPU Scheduling Suite
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                Everything you need to understand and visualize CPU scheduling algorithms
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Cpu}
              title="Multiple Algorithms"
              description="Support for FCFS, SJF, SRTF, Round Robin, Priority, and Banker's Algorithm"
            />
            <FeatureCard
              icon={Clock}
              title="Real-time Visualization"
              description="Interactive Gantt charts and process tables with dynamic updates"
            />
            <FeatureCard
              icon={BarChart2}
              title="Performance Metrics"
              description="Detailed analysis of waiting time, turnaround time, and throughput"
            />
            <FeatureCard
              icon={Code2}
              title="Interactive Interface"
              description="User-friendly forms and controls for easy process management"
            />
            <FeatureCard
              icon={Brain}
              title="Learning Tool"
              description="Perfect for students and professionals studying operating systems"
            />
            <FeatureCard
              icon={Cpu}
              title="Resource Management"
              description="Advanced resource allocation with Banker's Algorithm simulation"
            />
          </div>
        </div>
      </div>
    </div>
  );
}