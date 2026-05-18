import React from "react"
import { MdOutlineInbox } from "react-icons/md"

const EmptyState = ({ message, icon: Icon = MdOutlineInbox, actionText, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
      <div className="bg-white p-4 rounded-full shadow-sm mb-4">
        <Icon className="text-5xl text-gray-300" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Data Found</h3>
      <p className="text-gray-500 max-w-xs mb-6">
        {message || "It looks like there's nothing here yet."}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
        >
          {actionText}
        </button>
      )}
    </div>
  )
}

export default EmptyState
