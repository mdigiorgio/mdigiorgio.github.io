'use client'; // required for interactive components

import { useState } from 'react';
import Link from 'next/link';

export default function Reviews() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', { name, message });
    alert('Thank you for your review! (not saved yet)');
    setName('');
    setMessage('');
  };

  return (
    <div className="min-h-screen p-8 bg-white">
      <Link href="/" className="text-blue-600 underline">← Back to Home</Link>
      <h1 className="text-3xl font-bold mt-4">Leave a Review</h1>
      <form onSubmit={handleSubmit} className="mt-4 max-w-md space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Message</label>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

