// app/page.js
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-800">Hi, I’m Michele</h1>
      <p className="mt-4 text-lg text-blue-700">
        PADI Divemaster – Sharing my passion for the underwater world!
      </p>
      <div className="mt-8 space-x-4">
        <Link href="/about" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          About Me
        </Link>
        <Link href="/stories" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
          My Stories
        </Link>
      </div>
    </div>
  )
}

