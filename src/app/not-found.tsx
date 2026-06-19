import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full glass flex items-center justify-center">
          <span className="font-minecraft text-4xl">404</span>
        </div>
        <h1 className="font-minecraft text-2xl gradient-text mb-4">Lost in the End</h1>
        <p className="text-gray-400 text-sm mb-8">This page doesn&apos;t exist. The End is vast and empty...</p>
        <Link href="/" className="btn-primary px-6 py-3 rounded-lg text-sm">
          Return Home
        </Link>
      </div>
    </main>
  )
}
