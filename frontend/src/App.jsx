import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import Dashboard from "./pages/admin/Dashboard"
import ManageTask from "./pages/admin/ManageTask"
import ManageUser from "./pages/admin/ManageUser"
import CreateTask from "./pages/admin/CreateTask"
import PrivateRoute from './Routes/PrivateRoute'
import UserDashboard from './pages/user/UserDashboard'
import MyTask from './pages/user/MyTask'
import TaskDetails from './pages/user/TaskDetails'

const App = () => {
  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signUp' element={<SignUp/>}/>

      {/* Admin Route */}

      <Route element={<PrivateRoute allowedRoles={["admin"]}/> }>
      <Route path='/admin/dashboard' element={<Dashboard/>}/>
      <Route path='/admin/tasks' element={<ManageTask/>}/>
      <Route path='/admin/users' element={<ManageUser/>}/>
      <Route path='/admin/create-task' element={<CreateTask/>}/>
      </Route>

      {/* user Routes */}
      <Route element={<PrivateRoute allowedRoles={["user"]}/>}>
      <Route path='/user/dashboard' element={<UserDashboard/>}/>
      <Route path='/user/tasks' element={<MyTask/>}/>
      <Route path='/user/task-details/:id' element={<TaskDetails/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App