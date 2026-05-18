import React from "react"

const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className}`}></div>
  )
}

export const CardSkeleton = () => (
  <div className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-gray-100">
    <div className="flex justify-between">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-6 w-1/4 rounded-full" />
    </div>
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <div className="pt-4 flex justify-between items-center">
      <div className="flex -space-x-2">
        <Skeleton className="h-8 w-8 rounded-full border-2 border-white" />
        <Skeleton className="h-8 w-8 rounded-full border-2 border-white" />
      </div>
      <Skeleton className="h-4 w-20" />
    </div>
  </div>
)

export const UserCardSkeleton = () => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center gap-4">
    <Skeleton className="h-16 w-16 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-4 w-48" />
    </div>
  </div>
)

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <Skeleton className="h-6 w-32" />
    </div>
    <div className="p-6 space-y-4">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      ))}
    </div>
  </div>
)

export const DashboardSkeleton = () => (
  <div className="p-6 space-y-6">
    <Skeleton className="h-32 w-full rounded-xl" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-28 w-full rounded-xl" />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Skeleton className="h-80 w-full rounded-xl" />
      <Skeleton className="h-80 w-full rounded-xl" />
    </div>
    <TableSkeleton />
  </div>
)

export const TaskDetailsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
    <div className="md:col-span-3 space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-16 w-full" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-full" />
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  </div>
)

export const FormSkeleton = () => (
  <div className="p-6">
    <div className="bg-white rounded-lg shadow-md p-6 space-y-8">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-20 w-full" />
        </div>
        <Skeleton className="h-12 w-full mt-8" />
      </div>
    </div>
  </div>
)

export default Skeleton
