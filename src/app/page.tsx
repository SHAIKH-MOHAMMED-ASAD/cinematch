"use client";

import React from "react";
import Link from "next/link";
import SculptureHero from "@/components/ui/liquid-sculpture-hero";
import Navbar from "@/components/Navbar";
import {
  Users,
  Layers,
  Sliders,
  TrendingUp,
  ArrowRight,
  Database,
  Cpu,
  BarChart3,
  Activity,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070708] text-white selection:bg-white/20 selection:text-white font-sans antialiased overflow-x-hidden">
      <Navbar />

      {/* Hero Section using liquid-sculpture-hero component */}
      <section className="relative">
        <SculptureHero
          eyebrow="Cinematic Intelligence Platform"
          headline={"Cinematic Taste\nReshaped by Particles."}
          headlineAccent="Reshaped by Particles."
          body="Real-time movie recommendations calculated over 62,423 titles and 25,000,000 interactions. Powered by 50-factor Truncated SVD Matrix Factorization and GPU particle dynamics."
          primaryCta={{ label: "Start Browsing", href: "/browse" }}
          secondaryCta={{ label: "Analysis Process", href: "/analysis" }}
          hint="Interact with the GPU sculpture to displace fluid particles"
          theme="dark"
          themeToggle={false}
          showCredit={false}
          ambient={true}
        />
      </section>

      {/* Discovery Models Preview */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-neutral-200" />
            <span>Four Intelligent Recommendation Paradigms</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight">
            How CineMatch Discovers Your Films
          </h2>
          <p className="text-neutral-400 text-sm mt-4">
            Choose between collaborative latent embeddings, genre-space content vectors, balanced hybrid models, or global trend analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 text-neutral-200" />
              </div>
              <h3 className="text-xl font-serif text-white mb-2">SVD Collaborative</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Deconstructs user-movie interaction matrices into 50 latent preference dimensions to surface unexpected affinities.
              </p>
            </div>
            <Link
              href="/browse"
              className="mt-6 text-xs font-mono text-neutral-400 group-hover:text-white flex items-center gap-1.5"
            >
              <span>Explore User Recs</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5 text-neutral-200" />
              </div>
              <h3 className="text-xl font-serif text-white mb-2">Genre Content</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Computes cosine similarity across multi-genre embeddings to find titles with identical stylistic DNA.
              </p>
            </div>
            <Link
              href="/browse"
              className="mt-6 text-xs font-mono text-neutral-400 group-hover:text-white flex items-center gap-1.5"
            >
              <span>Search Seed Films</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <Sliders className="w-5 h-5 text-neutral-200" />
              </div>
              <h3 className="text-xl font-serif text-white mb-2">Hybrid Fusion</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Combines collaborative matrix factors with genre content matching using dynamic weight sliders for balanced discovery.
              </p>
            </div>
            <Link
              href="/browse"
              className="mt-6 text-xs font-mono text-neutral-400 group-hover:text-white flex items-center gap-1.5"
            >
              <span>Tune Balance Slider</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 text-neutral-200" />
              </div>
              <h3 className="text-xl font-serif text-white mb-2">Top Rated & Trending</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Bayesian-weighted scoring that accounts for both mean rating and review confidence across all film genres.
              </p>
            </div>
            <Link
              href="/browse"
              className="mt-6 text-xs font-mono text-neutral-400 group-hover:text-white flex items-center gap-1.5"
            >
              <span>View Leaderboards</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Callout Banner to Browse */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-neutral-900/60 to-neutral-950 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Interactive Recommendation Engine
            </span>
            <h3 className="text-2xl md:text-4xl font-serif text-white mt-2">
              Ready to find your next favorite film?
            </h3>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              Access the full studio with paginated results, real-time release year filters, seed search, and user profile emulation.
            </p>
          </div>
          <Link
            href="/browse"
            className="px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all duration-300 whitespace-nowrap shadow-xl flex items-center gap-2"
          >
            <span>Start Browsing Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="mt-20 border-t border-white/10 py-12 px-6 md:px-12 bg-[#050506]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
              M
            </div>
            <span className="font-serif text-sm tracking-widest uppercase text-neutral-300">
              CineMatch Intelligence
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-neutral-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/browse" className="hover:text-white transition-colors">Browse Studio</Link>
            <Link href="/analysis" className="hover:text-white transition-colors">Dataset & Analysis</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
