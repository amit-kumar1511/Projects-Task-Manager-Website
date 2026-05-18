import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import DashboardLayout from "../../components/DashboardLayout"
import { MdDelete, MdAutoAwesome } from "react-icons/md"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import SelectedUsers from "../../components/SelectedUsers"
import TodoListInput from "../../components/TodoListInput"
import AddAttachmentsInput from "../../components/AddAttachmentsInput"
import axiosInstance from "../../utils/axioInstance"
import moment from "moment"
import toast from "react-hot-toast"
import Modal from "../../components/Modal"
import DeleteAlert from "../../components/DeleteAlert"
import { FormSkeleton } from "../../components/Skeleton"

const CreateTask = () => {
  const location = useLocation()
  const { taskId } = location.state || {}

  const navigate = useNavigate()

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  })

  const [currentTask, setCurrentTask] = useState(null)

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetchingData, setFetchingData] = useState(false)

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false)

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({
      ...prevData,
      [key]: value,
    }))
  }

  const clearData = () => {
    // reset form data
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    })
  }

  // create task
  const createTask = async () => {
    try {
      setLoading(true)
      const todolist = taskData.todoChecklist?.map((item) => ({
        text: item,
        completed: false,
      }))

      await axiosInstance.post("/tasks/create", {
        ...taskData,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null,
        todoChecklist: todolist,
      })

      toast.success("Task created successfully!")
      clearData()
      navigate("/admin/tasks")
    } catch (error) {
      console.log("Error creating task: ", error)
      toast.error(error.response?.data?.message || "Error creating task!")
    } finally {
      setLoading(false)
    }
  }

  // update task
  const updateTask = async () => {
    try {
      setLoading(true)
      const todolist = taskData.todoChecklist?.map((item) => {
        const prevTodoChecklist = currentTask?.todoChecklist || []
        const matchedTask = prevTodoChecklist.find((task) => task.text === item)

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        }
      })

      await axiosInstance.put(`/tasks/${taskId}`, {
        ...taskData,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null,
        todoChecklist: todolist,
      })

      toast.success("Task updated successfully!")
      navigate("/admin/tasks")
    } catch (error) {
      console.log("Error updating task: ", error)
      toast.error(error.response?.data?.message || "Error updating task!")
    } finally {
      setLoading(false)
    }
  }

  const generateAiDescription = async () => {
    if (!taskData.title.trim()) {
      toast.error("Please enter a title first!")
      return
    }

    try {
      setIsGeneratingDescription(true)
      const response = await axiosInstance.post("/ai/generate-description", {
        title: taskData.title
      })

      if (response.data?.description) {
        handleValueChange("description", response.data.description)
        toast.success("Description generated!")
      }
    } catch (error) {
      console.error("AI Error:", error)
      const message = error.response?.data?.message || "Failed to generate description"
      toast.error(message)
    } finally {
      setIsGeneratingDescription(false)
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!taskData.title.trim()) {
      setError("Title is required!")
      return
    }

    if (!taskData.description.trim()) {
      setError("Description is required!")
      return
    }

    if (!taskData.dueDate) {
      setError("Due date is required!")
      return
    }

    if (taskData.assignedTo?.length === 0) {
      setError("Task is not assigned to any member!")
      return
    }

    if (taskData.todoChecklist?.length === 0) {
      setError("Add atleast one todo task!")
      return
    }

    if (taskId) {
      updateTask()

      return
    }

    createTask()
  }

  // get task info by id
  const getTaskDetailsById = async () => {
    try {
      setFetchingData(true)
      const response = await axiosInstance.get(`/tasks/${taskId}`)

      if (response.data) {
        const taskInfo = response.data
        setCurrentTask(taskInfo)

        setTaskData((prevState) => ({
          ...prevState,
          title: taskInfo?.title,
          description: taskInfo?.description,
          priority: taskInfo?.priority,
          dueDate: taskInfo?.dueDate
            ? new Date(taskInfo?.dueDate)
            : null,
          assignedTo: taskInfo?.assignedTo?.map((item) => (typeof item === "object" ? item._id : item)) || [],
          todoChecklist:
            taskInfo?.todoChecklist?.map((item) => item?.text) || [],
          attachments: taskInfo?.attachments || [],
        }))
      }
    } catch (error) {
      console.log("Error fetching task details: ", error)
    } finally {
      setFetchingData(false)
    }
  }

  // delete task
  const deleteTask = async () => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`)

      setOpenDeleteAlert(false)

      toast.success("Task deleted successfully!")

      navigate("/admin/tasks")
    } catch (error) {
      console.log("Error delating task: ", error)
    }
  }

  useEffect(() => {
    if (taskId) {
      getTaskDetailsById(taskId)
    }

    return () => {}
  }, [taskId])

  return (
    <DashboardLayout activeMenu={"Create Task"}>
      {fetchingData ? (
        <FormSkeleton />
      ) : (
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {taskId ? "Update Task" : "Create New Task"}
              </h2>

              {taskId && (
                <button
                  className="flex items-center gap-2 text-red-600 hover:text-red-800 cursor-pointer"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <MdDelete className="text-lg" /> Delete Task
                </button>
              )}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter task title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={taskData.title}
                    onChange={(e) => handleValueChange("title", e.target.value)}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <button
                      type="button"
                      onClick={generateAiDescription}
                      disabled={isGeneratingDescription}
                      className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 disabled:opacity-50 transition-all cursor-pointer"
                    >
                      <MdAutoAwesome className={isGeneratingDescription ? "animate-spin" : ""} />
                      {isGeneratingDescription ? "GENERATING..." : "USE AI"}
                    </button>
                  </div>

                  <textarea
                    placeholder="Enter task description"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={taskData.description}
                    onChange={(e) =>
                      handleValueChange("description", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>

                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={taskData.priority}
                      onChange={(e) =>
                        handleValueChange("priority", e.target.value)
                      }
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date
                    </label>

                    <div className="relative">
                      <DatePicker
                        selected={taskData.dueDate}
                        onChange={(data) => handleValueChange("dueDate", data)}
                        minDate={new Date()}
                        placeholderText="Select due date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign To
                  </label>

                  <SelectedUsers
                    selectedUser={taskData.assignedTo}
                    setSelectedUser={(value) =>
                      handleValueChange("assignedTo", value)
                    }
                  />
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    TODO Checklist
                  </label>

                  <TodoListInput
                    todoList={taskData?.todoChecklist}
                    setTodoList={(value) =>
                      handleValueChange("todoChecklist", value)
                    }
                  />
                </div>

                <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Add Attachments
                    </label>

                  <AddAttachmentsInput
                    attachments={taskData?.attachments}
                    setAttachments={(value) =>
                      handleValueChange("attachments", value)
                    }
                  />
                </div>

                <div className="flex justify-end mt-7">
                  <button
                    className="px-2 py-2 bg-green-500 border border-green-300 rounded-md text-white hover:bg-green-800 cursor-pointer w-full font-bold transition-all disabled:opacity-50"
                    onClick={handleSubmit}
                    type="button"
                    disabled={loading}
                  >
                    {loading
                      ? "SAVING..."
                      : taskId
                      ? "UPDATE TASK"
                      : "CREATE TASK"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title={"Delete Task"}
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={() => deleteTask()}
        />
      </Modal>
    </DashboardLayout>
  )
}

export default CreateTask
