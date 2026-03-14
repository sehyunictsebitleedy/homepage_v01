"use client";

import { useActionState } from "react";
import type { loginAction } from "./actions";

type ActionFn = typeof loginAction;

interface Props {
  action: ActionFn;
}

export default function LoginForm({ action }: Props) {
  const [state, formAction, isPending] = useActionState(action, { error: "" });

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      {/* grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.035] bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%20opacity%3D%221%22%2F%3E%3C%2Fsvg%3E')]" />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="mb-10 text-center">
          <span className="font-mono text-lg font-bold tracking-[0.2em] uppercase">
            SEHYUN<span className="text-[#c8ff00]">ICT</span>
          </span>
          <p className="mt-2 text-xs text-[#555] tracking-widest uppercase">
            Admin CMS
          </p>
        </div>

        {/* Card */}
        <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-8">
          <h1 className="text-sm font-semibold tracking-widest uppercase text-[#888] mb-6">
            Sign In
          </h1>

          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-xs text-[#555] tracking-wider uppercase mb-1.5">
                Username
              </label>
              <input
                type="text"
                name="username"
                autoComplete="username"
                required
                className="w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2.5 outline-none focus:border-[#c8ff00] transition-colors placeholder:text-[#333]"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-xs text-[#555] tracking-wider uppercase mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                className="w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2.5 outline-none focus:border-[#c8ff00] transition-colors placeholder:text-[#333]"
                placeholder="••••••••"
              />
            </div>

            {state.error && (
              <p className="text-xs text-[#ff3cac] tracking-wide">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 bg-[#c8ff00] text-[#080808] text-sm font-bold tracking-widest uppercase py-3 hover:bg-[#d4ff33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#333]">
          SEHYUNICT CMS v1.0
        </p>
      </div>
    </div>
  );
}
