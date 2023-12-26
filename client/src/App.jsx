import {BrowserRouter as Router , Route,Routes} from "react-router-dom"
import AppLayout from "./AppLayout"
import HomeScreen from "./pages/HomeScreen"
import Register from "./components/Register"
import Login from "./components/Login"
import Dashboard from "./pages/Dashboard"
import TaskList from "./components/TaskList"
import AddTask from "./components/AddTask"
import Profile from "./components/Profile"
import ReportBug from "./components/ReportBug"
import UpdateTask from "./components/UpdateTask"
function App() {

  return (

    <Router>
          <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
              <Route path='/' element={<AppLayout />}>
                    <Route path='/' element={<HomeScreen />} />
                    {/* dashboard is parentRoute */}
                    <Route path="/dashboard" element={<Dashboard />}>
                          <Route path="/dashboard" element={<TaskList />} />
                          <Route path="/dashboard/search/:keyword" element={<TaskList />} />
                          <Route path="/dashboard/addTask" element={<AddTask />} />
                          <Route path="/dashboard/editTask" element={<UpdateTask />} />
                          <Route path="/dashboard/profile" element={<Profile />} />
                          <Route path="/dashboard/report" element={<ReportBug />} />
                    </Route>
              </Route>
          </Routes>
    </Router>
  )
}

export default App
