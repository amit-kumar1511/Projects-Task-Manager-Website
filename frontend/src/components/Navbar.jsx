import React, { useState } from "react"
import { MdClose, MdMenu } from "react-icons/md"
import SideMenu from "./SideMenu"

import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { signOutSuccess } from "../redux/slice/userSlice"
import { getInitials } from "../utils/helper"
import axiosInstance from "../utils/axioInstance"

const Navbar = ({ activeMenu, isLandingPage }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/sign-out")
      localStorage.clear()
      dispatch(signOutSuccess())
      navigate("/login")
    } catch (error) {
      console.log("Logout error:", error)
      // Fallback: still clear state if server fails
      localStorage.clear()
      dispatch(signOutSuccess())
      navigate("/login")
    }
  }

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
    <div className="bg-white shadow-sm sticky top-0 z-10 flex items-center justify-between">
      

      <div 
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img 
          src="/logo.png" 
          alt="Taskora Logo" 
          className="h-19 w-19 object-contain"
        />
        <h2 className="text-2xl font-bold text-gray-800">Taskora</h2>
      </div>

      <div className="flex items-center space-x-4 px-4 sm:px-6 lg:px-8">
        {isLandingPage && (
          <div className="flex items-center gap-4">
            <button 
              onClick={handleDashboardRedirect}
              className="text-gray-600 font-medium hover:text-blue-600 transition-colors px-4 py-2"
            >
              Dashboard
            </button>
            
            {!currentUser ? (
              <>
                <button 
                  onClick={() => navigate("/login")}
                  className="text-gray-600 font-medium hover:text-blue-600 transition-colors px-4 py-2 border-l border-gray-200 ml-2"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate("/admin-signup")}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-0.5"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setShowLogout(!showLogout)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold shadow-md hover:bg-blue-700 transition-colors"
                  title={currentUser.name}
                >
                  {getInitials(currentUser.name)}
                </button>

                {showLogout && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-50">
                      <p className="text-sm font-bold text-gray-800 truncate">{currentUser.name}</p>
                      <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {!isLandingPage && (
          <button
            className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors lg:hidden"
            onClick={() => setOpenSideMenu(!openSideMenu)}
          >
            {openSideMenu ? (
              <MdClose className="text-2xl" />
            ) : (
              <MdMenu className="text-2xl" />
            )}
          </button>
        )}
      </div>

      {openSideMenu && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="relative z-50 w-72 h-full bg-white shadow-xl">
            <button
              className="absolute top-4 right-4 p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors"
              onClick={() => setOpenSideMenu(false)}
            >
              <MdClose className="text-2xl" />
            </button>

            <div className="pt-16">
              <SideMenu activeMenu={activeMenu} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
