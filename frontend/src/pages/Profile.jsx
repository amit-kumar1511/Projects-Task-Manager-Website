import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DashboardLayout from "../components/DashboardLayout"
import ProfilePhotoSelector from "../components/ProfilePhotoSelector"
import { MdPerson, MdEmail, MdLock, MdBusiness, MdFingerprint } from "react-icons/md"
import axiosInstance from "../utils/axioInstance"
import uploadImage from "../utils/uploadImage"
import { signInSuccess } from "../redux/slice/userSlice"
import toast from "react-hot-toast"

const Profile = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)

  const [name, setName] = useState(currentUser?.name || "")
  const [email, setEmail] = useState(currentUser?.email || "")
  const [profilePic, setProfilePic] = useState(currentUser?.profileImageUrl || null)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let profileImageUrl = currentUser?.profileImageUrl

      // If a new file is selected (not a URL string), upload it
      if (profilePic && typeof profilePic !== "string") {
        const uploadRes = await uploadImage(profilePic)
        profileImageUrl = uploadRes.imageUrl
      }

      const response = await axiosInstance.put("/auth/update-profile", {
        name,
        email,
        profileImageUrl,
        ...(password && { password }),
      })

      if (response.data) {
        dispatch(signInSuccess(response.data))
        toast.success("Profile updated successfully!")
        setPassword("")
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-600"></div>
          
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-8 flex flex-col items-center">
              <ProfilePhotoSelector
                image={profilePic}
                setImage={setProfilePic}
              />
              <h2 className="text-2xl font-bold text-gray-800 mt-4">{currentUser?.name}</h2>
              <p className="text-gray-500 uppercase tracking-wider text-xs font-semibold">{currentUser?.role}</p>
            </div>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Info */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                    <MdPerson className="text-blue-500" /> Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                    <MdEmail className="text-blue-500" /> Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Security & Workspace */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Security & Workspace</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                    <MdLock className="text-blue-500" /> New Password (Optional)
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>

                {currentUser?.role === "admin" && (
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <label className="block text-xs font-bold text-blue-600 mb-2 flex items-center gap-2 uppercase tracking-tighter">
                      <MdFingerprint /> Company Credentials
                    </label>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <MdBusiness className="text-blue-400" /> {currentUser?.companyId}
                        </p>
                        <p className="text-[10px] text-blue-400 mt-1 uppercase">Unique Workspace ID</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(currentUser?.companyId)
                          toast.success("ID copied to clipboard!")
                        }}
                        className="text-xs text-blue-600 hover:underline font-semibold"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}
                
                {currentUser?.role !== "admin" && (
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                   <label className="block text-xs font-bold text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-tighter">
                     <MdBusiness /> Workspace
                   </label>
                   <p className="text-sm font-medium text-gray-700">{currentUser?.companyId}</p>
                 </div>
                )}
              </div>

              <div className="md:col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {loading ? "Saving Changes..." : "Save Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Profile
