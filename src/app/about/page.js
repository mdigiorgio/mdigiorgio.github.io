// app/about/page.js
import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-white p-8">
      <Link href="/" className="text-blue-600 underline">← Back to Home</Link>
      <h1 className="text-3xl font-bold mt-4">About Me</h1>
      <p className="mt-2 text-gray-700">
        I’m a certified Divemaster with experience guiding dives in Australia, Dominican Republic, Italy, Jordan, Philippines, Thailand.
        This site showcases my work, my diving stories, and testimonials from happy customers.
      </p>
      <a href="/resume_scuba_mdg.pdf" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Download my Resume
      </a>
    </div>
  )
}

