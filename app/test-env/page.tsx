export default function TestEnvPage() {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">🔍 Test Environment Variables</h1>

      <div className="space-y-4">
        <div className="rounded bg-gray-100 p-4">
          <h2 className="font-semibold">Firebase Variables:</h2>
          <p>API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'NOT SET'}</p>
          <p>Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'NOT SET'}</p>
          <p>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'NOT SET'}</p>
        </div>

        <div className="rounded bg-gray-100 p-4">
          <h2 className="font-semibold">Environment Info:</h2>
          <p>NODE_ENV: {process.env.NODE_ENV || 'NOT SET'}</p>
          <p>VERCEL_ENV: {process.env.VERCEL_ENV || 'NOT SET'}</p>
          <p>NEXT_PUBLIC_ENV: {process.env.NEXT_PUBLIC_ENV || 'NOT SET'}</p>
        </div>
      </div>
    </div>
  )
}
