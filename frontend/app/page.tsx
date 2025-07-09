'use client';
import { motion } from 'framer-motion';
import PollForm from '@/components/PollForm';
import PollList from '@/components/PollList';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Vote, Users, BarChart3, Zap, ArrowRight, CheckCircle, Globe, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();

  const features = [
    {
      icon: Users,
      title: "Real-time Voting",
      description: "Watch votes come in live with instant updates and real-time synchronization across all devices",
      color: "text-purple-500"
    },
    {
      icon: BarChart3,
      title: "Beautiful Analytics",
      description: "Visualize results with interactive charts, detailed breakdowns, and exportable reports",
      color: "text-blue-500"
    },
    {
      icon: Zap,
      title: "Easy Sharing",
      description: "Share polls instantly with QR codes, direct links, and social media integration",
      color: "text-green-500"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Reach audiences worldwide with multi-language support and timezone handling",
      color: "text-orange-500"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security with encrypted data and privacy-first approach",
      color: "text-red-500"
    },
    {
      icon: Clock,
      title: "Time Controls",
      description: "Set expiry dates, schedule polls, and control voting windows with precision",
      color: "text-indigo-500"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50K+", label: "Polls Created" },
    { number: "1M+", label: "Votes Cast" },
    { number: "99.9%", label: "Uptime" }
  ];

  const benefits = [
    "Create unlimited polls with custom options",
    "Real-time results with live updates",
    "Mobile-responsive design for all devices",
    "Advanced analytics and reporting",
    "QR code generation for easy sharing",
    "Secure authentication and data protection"
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 -z-10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        <div className="relative z-10 flex flex-col items-center justify-center py-24">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Create, Share, and Vote on Polls Instantly
          </h1>
          <p className="text-lg md:text-xl text-gray-700 text-center mb-8 max-w-2xl">
            PollFlow lets you create beautiful, real-time polls and share them with anyone. Get instant feedback and visualize results live!
          </p>
          <Button asChild size="lg" className="mb-4">
            <Link href="/create">Create a Poll</Link>
          </Button>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Everything you need to create amazing polls
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Powerful features designed to make polling simple, engaging, and insightful
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-50 mb-6`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl mx-4"
      >
        <div className="max-w-4xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why choose PollFlow?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of users who trust PollFlow for their polling needs
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Live Results</h3>
                    <p className="text-sm text-gray-500">Real-time updates</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Option A</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "45%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Option B</span>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "35%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 1 }}
                      className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Option C</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "20%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9, duration: 1 }}
                      className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Poll Creation Form */}
      {user && (
        <motion.section
          id="create-poll"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="py-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Create Your Poll
            </h2>
            <p className="text-xl text-gray-600">
              Start gathering feedback in minutes
            </p>
          </div>
          <PollForm />
        </motion.section>
      )}

      {/* Recent Polls */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: user ? 0.4 : 0.3 }}
        className="py-12"
      >
        <PollList />
      </motion.section>

      {/* CTA Section */}
      {!user && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-20 text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl mx-4 text-white"
          id='recent-poll'
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto px-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to start polling?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Join thousands of users creating engaging polls with real-time results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4 bg-white text-purple-600 hover:bg-gray-50" asChild>
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white/10" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
            </div>
          </motion.div>
        </motion.section>
      )}
    </div>
  );
}