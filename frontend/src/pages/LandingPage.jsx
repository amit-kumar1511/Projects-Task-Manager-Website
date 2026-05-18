import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { MdOutlineGroups, MdOutlineBarChart, MdOutlineAssignment, MdOutlineCloudUpload, MdOutlineSecurity, MdPerson } from "react-icons/md"
import { IoRocketOutline } from "react-icons/io5"
import { FiArrowRight } from "react-icons/fi"
import Navbar from "../components/Navbar"

const LandingPage = () => {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)

  const handleDashboardRedirect = () => {
    if (!currentUser) {
      navigate("/login")
    } else if (currentUser?.role === "admin") {
      navigate("/admin/dashboard")
    } else {
      navigate("/user/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100">
      <Navbar isLandingPage={true} />

      {/* Hero Section */}
      <section className="pt-13 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-6 animate-bounce">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Multi-Company Support Now Live
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight mb-6">
              One Platform. <br />
              <span className="text-blue-600 italic">Infinite</span> Workspaces.
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              The only project management tool designed for teams handling multiple companies. Secure, scalable, and beautifully simple.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button 
                onClick={handleDashboardRedirect}
                className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all hover:scale-105 flex items-center justify-center gap-3"
              >
                Go to Dashboard <FiArrowRight />
              </button>
            </div>
          </div>
          <div className="flex-1 relative max-w-lg mx-auto lg:mx-0">
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full opacity-50 blur-3xl"></div>
            <img
              src="/project_management_hero.png"
              alt="Platform Dashboard"
              className="w-full h-auto rounded-3xl shadow-2xl border border-gray-100 animate-float"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Companies", value: "500+" },
              { label: "Tasks Completed", value: "1M+" },
              { label: "User Satisfaction", value: "99.9%" },
              { label: "Secure Data", value: "100%" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Core Capabilities</h2>
            <h3 className="text-4xl font-extrabold text-gray-900 mb-4">Everything your business needs to scale</h3>
            <p className="text-gray-500 max-w-2xl mx-auto">Our multi-tenant architecture ensures that every company operates in its own secure, private environment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MdOutlineGroups className="text-3xl text-blue-600" />}
              title="Multi-Company Setup"
              description="Manage multiple client organizations from a single account with complete data isolation."
            />
            <FeatureCard
              icon={<MdOutlineAssignment className="text-3xl text-indigo-600" />}
              title="Advanced Task Tracking"
              description="Visualize workflows with boards, lists, and real-time status updates across all teams."
            />
            <FeatureCard
              icon={<MdOutlineBarChart className="text-3xl text-purple-600" />}
              title="Real-time Analytics"
              description="Track productivity with deep-dive reports on task distribution and priority levels."
            />
            <FeatureCard
              icon={<MdOutlineCloudUpload className="text-3xl text-cyan-600" />}
              title="Secure Attachments"
              description="Upload and share project files directly within tasks for better collaboration."
            />
            <FeatureCard
              icon={<MdOutlineSecurity className="text-3xl text-emerald-600" />}
              title="Enterprise Security"
              description="Role-based access control and encrypted data storage keep your workspaces private."
            />
            <FeatureCard
              icon={<IoRocketOutline className="text-3xl text-orange-600" />}
              title="Ultra Responsive"
              description="Access your projects anywhere. The mobile-first design keeps you connected on the go."
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-gray-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h3 className="text-4xl font-bold mb-8 leading-tight">Start managing in minutes, <br />not hours.</h3>
              <div className="space-y-12">
                <Step
                  number="01"
                  title="Create Admin Account"
                  description="Sign up as an admin to generate your unique Company Workspace ID."
                />
                <Step
                  number="02"
                  title="Invite Your Team"
                  description="Share your Company ID with team members to onboard them instantly."
                />
                <Step
                  number="03"
                  title="Launch Projects"
                  description="Create tasks, assign owners, and watch your productivity skyrocket."
                />
              </div>
            </div>
            <div className="flex-1 bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-xl">
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-white/5">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="h-4 w-3/4 bg-white/10 rounded-full"></div>
                <div className="h-4 w-1/2 bg-white/5 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-2xl">★</span>
            ))}
          </div>
          <blockquote className="text-3xl font-medium text-gray-900 mb-8 italic">
            "ProFlow changed how we handle multiple client projects. The separation of companies is brilliant and the UI is incredibly intuitive."
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <MdPerson className="text-3xl text-blue-600" />
            </div>
            <div className="font-bold text-gray-900 text-lg">Alex Rivera</div>
            <div className="text-gray-500">CTO at TechFlow Systems</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

            <h3 className="text-4xl lg:text-5xl font-bold text-white mb-8 relative z-10">
              Ready to streamline your <br />project management?
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              {currentUser ? (
                <button
                  onClick={handleDashboardRedirect}
                  className="w-full sm:w-auto px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all shadow-xl"
                >
                  Continue to Dashboard
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/admin-signup")}
                    className="w-full sm:w-auto px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all shadow-xl"
                  >
                    Get Started Free
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
                  >
                    Talk to Sales
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                <img
                  src="/logo.png"
                  alt="Taskora Logo"
                  className="h-12 w-12 object-contain"
                />
                <span className="text-xl font-bold text-gray-800 tracking-tight">Taskora</span>
              </div>
              <p className="text-gray-500 max-w-sm mb-6">
                Modernizing project management for multi-tenant organizations. Scale without limits.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2026 Taskora Inc. All rights reserved.
            </div>
            <div className="flex gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
              <a href="#" className="hover:text-blue-600 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-blue-600 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Global CSS for animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
    <p className="text-gray-500 leading-relaxed">{description}</p>
  </div>
)

const Step = ({ number, title, description }) => (
  <div className="flex gap-6 items-start">
    <div className="text-4xl font-black text-white/20 select-none">{number}</div>
    <div>
      <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
      <p className="text-white/60 leading-relaxed">{description}</p>
    </div>
  </div>
)

export default LandingPage
