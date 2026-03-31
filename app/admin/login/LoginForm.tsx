"use client";

import { useActionState } from "react";
import type { loginAction } from "./actions";

type ActionFn = typeof loginAction;

interface Props {
  action: ActionFn;
  worksError?: string;
}

const WORKS_ERROR_MSG: Record<string, string> = {
  not_authorized: "등록되지 않은 LINE WORKS 계정입니다. 관리자에게 문의하세요.",
  disabled: "비활성화된 계정입니다. 관리자에게 문의하세요.",
  token_failed: "LINE WORKS 인증에 실패했습니다. 다시 시도해주세요.",
  user_failed: "사용자 정보를 가져올 수 없습니다. 다시 시도해주세요.",
  invalid_state: "보안 오류가 발생했습니다. 다시 시도해주세요.",
  not_configured: "LINE WORKS 설정이 완료되지 않았습니다.",
};

export default function LoginForm({ action, worksError }: Props) {
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
          <p className="mt-2 text-xs text-[#b5b5b5] tracking-widest uppercase">
            Admin CMS
          </p>
        </div>

        {/* Card */}
        <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-8 space-y-6">
          <h1 className="text-sm font-semibold tracking-widest uppercase text-[#ddd9d9]">
            Sign In
          </h1>

          {/* LINE WORKS 로그인 */}
          <div>
            <a
              href="/api/auth/works"
              className="flex items-center justify-center gap-2 w-full border border-[#2a2a2a] bg-[#111] text-[#f0f0f0] text-xs font-bold tracking-widest uppercase py-3 hover:border-[#c8ff00] hover:text-[#c8ff00] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.145 2 11.243c0 3.173 1.677 5.99 4.28 7.772V22l3.912-2.152A11.14 11.14 0 0 0 12 20.486c5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.007 12.44-2.544-2.714-4.963 2.714 5.462-5.797 2.607 2.714 4.9-2.714-5.462 5.797z"/>
              </svg>
              LINE WORKS로 로그인
            </a>
            {worksError && (
              <p className="mt-2 text-xs text-[#ff3cac] tracking-wide">
                {WORKS_ERROR_MSG[worksError] ?? "로그인 중 오류가 발생했습니다."}
              </p>
            )}
          </div>

          {/* 구분선 */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#1e1e1e]" />
            <span className="text-[10px] font-mono text-[#333] tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-[#1e1e1e]" />
          </div>

          {/* Superadmin 로그인 */}
          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-xs text-[#b5b5b5] tracking-wider uppercase mb-1.5">
                Username
              </label>
              <input
                type="text"
                name="username"
                autoComplete="username"
                required
                className="w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2.5 outline-none focus:border-[#c8ff00] transition-colors placeholder:text-[#555]"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-xs text-[#b5b5b5] tracking-wider uppercase mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                className="w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2.5 outline-none focus:border-[#c8ff00] transition-colors placeholder:text-[#555]"
                placeholder="••••••••"
              />
            </div>

            {state.error && (
              <p className="text-xs text-[#ff3cac] tracking-wide">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#1e1e1e] text-[#b5b5b5] text-xs font-bold tracking-widest uppercase py-3 hover:bg-[#2a2a2a] hover:text-[#f0f0f0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing in..." : "Superadmin Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#555]">
          SEHYUNICT CMS v2.0
        </p>
      </div>
    </div>
  );
}
