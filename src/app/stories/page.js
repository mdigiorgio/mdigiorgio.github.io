// app/stories/page.js
import Link from 'next/link'

export default function Stories() {
  return (
    <div className="min-h-screen bg-white p-8">
      <Link href="/" className="text-blue-600 underline">← Back to Home</Link>
      <h1 className="text-3xl font-bold mt-4">My Diving Stories</h1>
      <p className="mt-2 text-gray-700">
        Here’s where I’ll share my latest adventures beneath the waves.
      </p>
    </div>
  )
}
