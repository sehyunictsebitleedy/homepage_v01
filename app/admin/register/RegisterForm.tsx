"use client";

import { useActionState } from "react";
import { registerAction } from "./actions";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, {
    error: "",
    success: false,
  });

  if (state.success) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="mb-6 text-center">
            <span className="font-mono text-lg font-bold tracking-[0.2em] uppercase">
              SEHYUN<span className="text-[#c8ff00]">ICT</span>
            </span>
          </div>
          <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-8">
            <div className="text-[#c8ff00] text-2xl mb-4">✓</div>
            <h1 className="text-sm font-semibold tracking-widest uppercase text-[#ddd9d9] mb-3">
              신청 완료
            </h1>
            <p className="text-xs text-[#b5b5b5] leading-relaxed mb-6">
              계정 신청이 접수되었습니다.<br />
              관리자 승인 후 로그인할 수 있습니다.
            </p>
            <a
              href="/admin/login"
              className="block w-full text-center bg-[#1e1e1e] text-[#f0f0f0] text-xs font-bold tracking-widest uppercase py-3 hover:bg-[#2a2a2a] transition-colors"
            >
              로그인 페이지로
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <div className="fixed inset-0 pointer-events-none opacity-[0.035] bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%20opacity%3D%221%22%2F%3E%3C%2Fsvg%3E')]" />

      <div className="w-full max-w-sm relative z-10">
        <div className="mb-10 text-center">
          <span className="font-mono text-lg font-bold tracking-[0.2em] uppercase">
            SEHYUN<span className="text-[#c8ff00]">ICT</span>
          </span>
          <p className="mt-2 text-xs text-[#b5b5b5] tracking-widest uppercase">
            Admin CMS
          </p>
        </div>

        <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-8">
          <h1 className="text-sm font-semibold tracking-widest uppercase text-[#ddd9d9] mb-6">
            계정 신청
          </h1>

          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-xs text-[#b5b5b5] tracking-wider uppercase mb-1.5">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                minLength={3}
                maxLength={20}
                pattern="[a-zA-Z0-9_]+"
                className="w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2.5 outline-none focus:border-[#c8ff00] transition-colors placeholder:text-[#666]"
                placeholder="영문, 숫자, _ 조합"
              />
            </div>

            <div>
              <label className="block text-xs text-[#b5b5b5] tracking-wider uppercase mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                className="w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2.5 outline-none focus:border-[#c8ff00] transition-colors placeholder:text-[#666]"
                placeholder="8자 이상"
              />
            </div>

            <div>
              <label className="block text-xs text-[#b5b5b5] tracking-wider uppercase mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm"
                required
                className="w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2.5 outline-none focus:border-[#c8ff00] transition-colors placeholder:text-[#666]"
                placeholder="비밀번호 재입력"
              />
            </div>

            <div>
              <label className="block text-xs text-[#b5b5b5] tracking-wider uppercase mb-1.5">
                역할 신청
              </label>
              <select
                name="role"
                required
                defaultValue=""
                className="w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2.5 outline-none focus:border-[#c8ff00] transition-colors"
              >
                <option value="" disabled>선택하세요</option>
                <option value="editor">Editor — 콘텐츠 수정</option>
                <option value="admin">Admin — 전체 관리</option>
              </select>
            </div>

            {state.error && (
              <p className="text-xs text-[#ff3cac] tracking-wide">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 bg-[#c8ff00] text-[#080808] text-sm font-bold tracking-widest uppercase py-3 hover:bg-[#d4ff33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "신청 중..." : "계정 신청"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#a1a1a1]">
          이미 계정이 있으신가요?{" "}
          <a href="/admin/login" className="text-[#c8ff00] hover:underline">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}
