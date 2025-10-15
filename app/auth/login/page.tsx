"use client";

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthProvider';
import Image from 'next/image';

function LoginForm() {
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();

  const redirectTo = searchParams.get('redirectedFrom') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const emailToUse = email.includes('@') ? email : `${email}@regtime.com`;
      const { error } = await signIn(emailToUse, password);

      if (error) {
        setError(error.message || 'Invalid credentials');
      } else {
        router.push(redirectTo);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#DEEDF4] to-[#78C7EA] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <Image
                src="/Limited Night 1080px.png"
                alt="Regtime"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-[#111111]">Welcome Back</h1>
            <p className="text-[#636363]">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#111111]">
                Username or Email
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[#9CB2BC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78C7EA] focus:border-transparent transition-all"
                placeholder="admin"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-[#111111]">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-[#9CB2BC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78C7EA] focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#78C7EA] hover:bg-[#496671] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center text-sm text-[#636363] pt-4 border-t border-[#EBEBEB]">
            <p>Default credentials: admin / password</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#DEEDF4] to-[#78C7EA]">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
