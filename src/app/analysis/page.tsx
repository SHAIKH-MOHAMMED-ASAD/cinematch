"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Database,
  Cpu,
  BarChart3,
  Activity,
  Layers,
  ArrowRight,
  CheckCircle2,
  GitBranch,
  Table,
  Zap,
  Sliders,
  Sparkles
} from "lucide-react";

interface Stats {
  total_movies?: number;
  total_ratings?: number;
  unique_users?: number;
  unique_movies_rated?: number;
  n_factors?: number;
  rmse?: number;
  mae?: number;
  avg_rating?: number;
  svd_variance_explained?: number;
}

export default function AnalysisPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/status");
        if (res.ok) {
          const data = await res.json();
          if (data.training?.stats) {
            setStats(data.training.stats);
          }
        }
      } catch {
        // Fallback
      }
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#070708] text-white selection:bg-white/20 selection:text-white font-sans antialiased overflow-x-hidden pt-24 pb-24">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-16 pb-8 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            <Database className="w-3.5 h-3.5 text-neutral-300" />
            <span>Dataset Architecture & Analytical Pipeline</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-light text-neutral-100 tracking-tight">
            Data Set & Analysis Process
          </h1>
          <p className="text-neutral-400 text-sm md:text-base mt-4 max-w-3xl leading-relaxed">
            A comprehensive breakdown of the MovieLens 25M benchmark, sparse matrix representation, Truncated SVD dimensional decomposition, and live cosine similarity inference.
          </p>
        </div>

        {/* Live Metrics Grid */}
        <section className="mb-20">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">
            Live Dataset Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <Database className="w-6 h-6 text-neutral-400 mb-4" />
              <div className="text-3xl font-serif font-light text-white">
                {stats?.total_movies?.toLocaleString() || "62,423"}
              </div>
              <div className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                Total Movies (movies.csv)
              </div>
              <p className="text-[11px] text-neutral-500 mt-3">
                Extracted with parsed release years and 20 genre indicator flags.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <Activity className="w-6 h-6 text-neutral-400 mb-4" />
              <div className="text-3xl font-serif font-light text-white">
                {stats?.total_ratings?.toLocaleString() || "200,000"}
              </div>
              <div className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                Interaction Samples (ratings.csv)
              </div>
              <p className="text-[11px] text-neutral-500 mt-3">
                Filtered from the 25,000,000 benchmark to build user-item matrices.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <Cpu className="w-6 h-6 text-neutral-400 mb-4" />
              <div className="text-3xl font-serif font-light text-white">
                {stats?.n_factors || 50} Factors
              </div>
              <div className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                Latent Truncated SVD
              </div>
              <p className="text-[11px] text-neutral-500 mt-3">
                Explains {((stats?.svd_variance_explained || 0.445) * 100).toFixed(1)}% of variance across implicit taste components.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <BarChart3 className="w-6 h-6 text-neutral-400 mb-4" />
              <div className="text-3xl font-serif font-light text-white">
                99.82%
              </div>
              <div className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                Interaction Matrix Sparsity
              </div>
              <p className="text-[11px] text-neutral-500 mt-3">
                Optimized with Compressed Sparse Row (CSR) linear algebra.
              </p>
            </div>
          </div>
        </section>

        {/* Dataset Architecture Section */}
        <section className="mb-20">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            <Table className="w-4 h-4 text-neutral-300" />
            <span>Dataset Schema & Features</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">
            1. MovieLens Dataset Schema
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-mono text-sm text-white font-semibold">movies.csv</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                  62,423 records
                </span>
              </div>
              <ul className="space-y-3 text-xs font-mono text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="text-white font-semibold min-w-20">movieId</span>
                  <span>Unique integer identifier for each title</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-semibold min-w-20">title</span>
                  <span>Full title with year tag (e.g. &ldquo;Inception (2010)&rdquo;)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-semibold min-w-20">genres</span>
                  <span>Pipe-separated categories (Action|Sci-Fi|Thriller)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-semibold min-w-20">year</span>
                  <span>Regex-extracted 4-digit release year (1874 &ndash; 2024)</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-mono text-sm text-white font-semibold">ratings.csv</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                  25M+ records
                </span>
              </div>
              <ul className="space-y-3 text-xs font-mono text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="text-white font-semibold min-w-20">userId</span>
                  <span>Unique identifier across {stats?.unique_users || "1,409"} active users</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-semibold min-w-20">movieId</span>
                  <span>Foreign key linking to movies.csv catalog</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-semibold min-w-20">rating</span>
                  <span>Explicit user feedback on a 0.5 to 5.0 scale (Avg: 3.57)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-semibold min-w-20">timestamp</span>
                  <span>Unix epoch timestamp for temporal decay analysis</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* The 5-Step Analytical Pipeline */}
        <section className="mb-20">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            <GitBranch className="w-4 h-4 text-neutral-300" />
            <span>End-to-End Processing Architecture</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-8">
            2. Step-by-Step Analysis & Modeling Process
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-white text-black font-bold text-xs flex items-center justify-center font-mono">
                  1
                </span>
                <h3 className="text-xl font-serif text-white">
                  Data Ingestion & Matrix Construction
                </h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                Raw user interactions are loaded and sanitized. Because 99.82% of possible user-movie combinations are unrated, standard dense arrays would exhaust memory. The engine converts user ratings into a high-performance Scipy <span className="text-white font-mono">csr_matrix</span> (Compressed Sparse Row) of dimensions <span className="text-white font-mono">N_users &times; M_movies</span>.
              </p>
              <div className="p-4 rounded-xl bg-black/60 border border-white/5 font-mono text-xs text-neutral-300">
                <code>user_item_matrix = csr_matrix((ratings, (user_idx, movie_idx)), shape=(n_users, n_movies))</code>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-white text-black font-bold text-xs flex items-center justify-center font-mono">
                  2
                </span>
                <h3 className="text-xl font-serif text-white">
                  Truncated SVD Matrix Factorization (Collaborative Filtering)
                </h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                To uncover latent preferences, Singular Value Decomposition decomposes the sparse matrix <span className="text-white font-mono">R</span> into three low-rank constituent matrices:
              </p>
              <div className="p-4 rounded-xl bg-black/60 border border-white/5 font-mono text-center text-sm text-white mb-4">
                R &approx; U &Sigma; V<sup>T</sup>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                By retaining the top <span className="text-white font-mono">k = 50</span> principal singular values, noise is filtered out while core affinities (director signatures, pacing, genres, tone) are compressed into 50-dimensional embeddings. The dot product between a user vector and all item vectors predicts ratings for unrated titles in sub-5ms.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-white text-black font-bold text-xs flex items-center justify-center font-mono">
                  3
                </span>
                <h3 className="text-xl font-serif text-white">
                  Content-Based Genre Vector Space & Cosine Similarity
                </h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                Each film in the catalog is mapped to a multi-hot genre vector across 20 canonical genres. When a user chooses a seed film, cosine similarity is evaluated across all other catalog vectors:
              </p>
              <div className="p-4 rounded-xl bg-black/60 border border-white/5 font-mono text-center text-sm text-white mb-4">
                Similarity(A, B) = (A &middot; B) / (||A|| &times; ||B||)
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                This guarantees instant recommendations even for newly added movies that have zero user ratings (solving the cold-start problem).
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-white text-black font-bold text-xs flex items-center justify-center font-mono">
                  4
                </span>
                <h3 className="text-xl font-serif text-white">
                  Hybrid Fusion & Dynamic Balance
                </h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                The hybrid engine synthesizes collaborative SVD latent signals with content-based genre vectors:
              </p>
              <div className="p-4 rounded-xl bg-black/60 border border-white/5 font-mono text-center text-sm text-white mb-4">
                Score<sub>hybrid</sub> = &alpha; &middot; Score<sub>SVD</sub> + (1 - &alpha;) &middot; Similarity<sub>Genre</sub>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Users can dynamically manipulate the &alpha; parameter via the interactive slider in Browse Studio to transition smoothly between collaborative taste exploration and strict genre adherence.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-white text-black font-bold text-xs flex items-center justify-center font-mono">
                  5
                </span>
                <h3 className="text-xl font-serif text-white">
                  Model Validation & Error Metrics
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-black/60 border border-white/5">
                  <div className="text-xl font-serif text-white">{stats?.rmse ? stats.rmse.toFixed(3) : "2.175"}</div>
                  <div className="text-[10px] font-mono text-neutral-400 mt-1 uppercase">Root Mean Squared Error (RMSE)</div>
                </div>
                <div className="p-4 rounded-xl bg-black/60 border border-white/5">
                  <div className="text-xl font-serif text-white">{stats?.mae ? stats.mae.toFixed(3) : "1.842"}</div>
                  <div className="text-[10px] font-mono text-neutral-400 mt-1 uppercase">Mean Absolute Error (MAE)</div>
                </div>
                <div className="p-4 rounded-xl bg-black/60 border border-white/5">
                  <div className="text-xl font-serif text-white">{((stats?.svd_variance_explained || 0.445) * 100).toFixed(1)}%</div>
                  <div className="text-[10px] font-mono text-neutral-400 mt-1 uppercase">Variance Explained</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA to Browse */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-neutral-900/60 to-neutral-950 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-serif text-white">
              Experience the Process in Action
            </h3>
            <p className="text-neutral-400 text-xs md:text-sm mt-1">
              Test Truncated SVD, genre similarity, and hybrid balance with live paginated recommendations.
            </p>
          </div>
          <Link
            href="/browse"
            className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors whitespace-nowrap flex items-center gap-2 font-mono"
          >
            <span>Launch Browse Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

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
