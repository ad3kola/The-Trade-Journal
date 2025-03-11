import { cn } from "@/lib/utils"
import { Skeleton } from "./ui/skeleton"


const DashbaordSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full items-start">
          <div className="grid gap-4 grid-cols-1 col-span-1 lg:col-span-2 w-full">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((_, indx) => (
                <div
                  key={indx}
                  className="rounded-lg border bg-input/20 border-input px-2 py-3 flex w-full"
                >
                  <Skeleton
                    className={cn(
                      "text-foreground flex items-center w-full max-w-12 justify-center h-full shrink-0",
                      indx % 2 && "order-2"
                    )}
                  />
                  <div className="flex-1 overflow-hidden flex flex-col justify-start gap-3 pl-3 w-full">
                    <Skeleton className="h-2 w-[60%]" />
                    <Skeleton className="h-2 w-1/3" />
                    <Skeleton className="h-2 mt-4 w-[75%]" />
                  </div>
                </div>
              ))}
            </div>
            <div className="skeleton-card">
              <Skeleton className="w-40 h-2.5" />
              <Skeleton className="w-[80%] h-2" />
              <Skeleton className="w-40 h-10" />
              <Skeleton className="h-72 lg:h-96 w-full rounded-2xl mt-2" />
              <Skeleton className="h-60 w-full rounded-2xl mt-2" />
            </div>
          </div>
          <div className="grid gap-4 col-span-1 grid-cols-1">
            <div className="skeleton-card p-6 h-fit">
              <Skeleton className="w-72 h-3.5" />
              <div className="grid grid-cols-8 gap-4 w-full mt-4">
                {new Array(48).fill(null).map((_, indx) => (
                  <Skeleton key={indx} className="h-8 w-full rounded-md mt-2" />
                ))}
              </div>
            </div>
            <div className="skeleton-card gap-6">
              <Skeleton className="w-52 h-3.5" />
              <Skeleton className="rounded-full h-60 w-60" />
              <Skeleton className="w-[60%] h-3.5" />
              <Skeleton className="w-[80%] h-3.5" />
            </div>
            <div className="skeleton-card w-full lg:h-auto py-6">
              <Skeleton className="w-[45%] h-4 mr-auto" />
              <Skeleton className="skeleton-card h-16 mt-5 rounded-2xl" />
            </div>
          </div>
        </div>
  )
}

export default DashbaordSkeleton
