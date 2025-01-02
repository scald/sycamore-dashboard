import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to Sycamore School Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Stay up to date with your children&apos;s academic progress. View grades, track performance,
            and monitor their educational journey all in one place.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View Grades Dashboard
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Real-time Updates</h2>
            <p className="text-gray-600">
              Get instant access to your children&apos;s latest grades and academic performance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Multiple Students</h2>
            <p className="text-gray-600">
              Easily switch between different students and view their individual progress.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Term History</h2>
            <p className="text-gray-600">
              Access historical grade data across different academic terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
