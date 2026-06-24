"use client";
import { useState } from "react";
import { GraduationCap, Send } from "lucide-react";

export function CTABanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#1A1A2E] py-20">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-red-700/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-red-700/10 blur-3xl" />
        <div className="absolute left-1/2 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-red-700/30 to-transparent" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
          {/* Left: Text */}
          <div className="max-w-xl text-center lg:text-left">
            <div className="mb-3 flex items-center justify-center gap-2 lg:justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700">
                <GraduationCap size={16} className="text-white" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                Stay Connected
              </p>
            </div>
            <h2 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
              Embrace Visibility Without{" "}
              <span className="text-red-500">Losing Your Passion</span> for
              Learning
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Subscribe to the NIIT newsletter and receive the latest news, events,
              scholarship opportunities, and academic updates directly in your
              inbox.
            </p>
          </div>

          {/* Right: subscribe form */}
          <div className="w-full max-w-md">
            {submitted ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-green-500/30 bg-green-900/20 p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                  <Send size={20} className="text-green-400" />
                </div>
                <h3 className="font-bold text-white">You&apos;re subscribed!</h3>
                <p className="text-sm text-gray-400">
                  Thank you for subscribing. We&apos;ll keep you updated with
                  our latest news and events.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="mb-4 text-sm font-bold text-white">
                  Subscribe to Our Newsletter
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full rounded-lg bg-white/10 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-white/10 transition focus:ring-red-600"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full rounded-lg bg-white/10 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-white/10 transition focus:ring-red-600"
                  />
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-800"
                  >
                    Subscribe Now <Send size={14} />
                  </button>
                </div>
                <p className="mt-3 text-center text-[10px] text-gray-500">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
