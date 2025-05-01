import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-12 w-3/4 mx-auto mb-6 bg-white/20" />
            <Skeleton className="h-24 w-full mx-auto mb-8 bg-white/20" />
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
              <Skeleton className="h-12 w-48 mx-auto bg-white/20" />
              <Skeleton className="h-12 w-64 mx-auto bg-white/20" />
            </div>
            <Skeleton className="h-12 w-56 mx-auto bg-white/20" />
          </div>
        </div>
      </section>

      {/* Informations Section Skeleton */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-blue-50 p-6 rounded-xl">
                  <Skeleton className="h-12 w-12 mx-auto mb-4 bg-blue-200" />
                  <Skeleton className="h-6 w-3/4 mx-auto mb-2 bg-blue-200" />
                  <Skeleton className="h-4 w-full mx-auto mb-1 bg-blue-200" />
                  <Skeleton className="h-4 w-full mx-auto mb-1 bg-blue-200" />
                  <Skeleton className="h-4 w-2/3 mx-auto bg-blue-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doctors List Section Skeleton */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-12 bg-gray-300" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow"
              >
                <Skeleton className="h-64 w-full bg-gray-300" />
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <Skeleton className="h-4 w-16 mr-2 bg-gray-300" />
                    <Skeleton className="h-4 w-20 bg-gray-300" />
                  </div>
                  <Skeleton className="h-6 w-48 mb-1 bg-gray-300" />
                  <Skeleton className="h-5 w-32 mb-3 bg-gray-300" />
                  <Skeleton className="h-4 w-40 mb-1 bg-gray-300" />
                  <div className="flex gap-1 mb-4">
                    <Skeleton className="h-6 w-20 bg-gray-300" />
                    <Skeleton className="h-6 w-20 bg-gray-300" />
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start">
                      <Skeleton className="h-5 w-5 mr-2 bg-gray-300" />
                      <Skeleton className="h-4 w-full bg-gray-300" />
                    </div>
                    <div className="flex items-center">
                      <Skeleton className="h-5 w-5 mr-2 bg-gray-300" />
                      <Skeleton className="h-4 w-32 bg-gray-300" />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Skeleton className="h-10 w-full bg-gray-300" />
                    <Skeleton className="h-10 w-full bg-gray-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section Skeleton */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Skeleton className="h-10 w-64 mx-auto mb-8 bg-gray-300" />
            <Skeleton className="h-96 w-full rounded-xl mb-8 bg-gray-300" />
            <div className="bg-blue-50 p-8 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Skeleton className="h-8 w-64 mb-4 bg-blue-200" />
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start">
                        <Skeleton className="h-5 w-5 mr-3 bg-blue-200" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-24 mb-1 bg-blue-200" />
                          <Skeleton className="h-4 w-full bg-blue-200" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Skeleton className="h-8 w-64 mb-4 bg-blue-200" />
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-5 w-full mb-2 bg-blue-200" />
                  ))}
                  <Skeleton className="h-10 w-full mt-6 bg-blue-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-10 w-3/4 mx-auto mb-6 bg-white/20" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-2 bg-white/20" />
          <Skeleton className="h-6 w-3/4 max-w-xl mx-auto mb-8 bg-white/20" />
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Skeleton className="h-12 w-48 mx-auto bg-white/20" />
            <Skeleton className="h-12 w-48 mx-auto bg-white/20" />
          </div>
        </div>
      </section>
    </div>
  );
}
