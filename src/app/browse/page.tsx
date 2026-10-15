"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import {
  Sparkles,
  Film,
  Users,
  Layers,
  Search,
  Sliders,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Calendar,
  History,
  RefreshCw,
  ArrowRight
} from "lucide-react";

interface Movie {
  movieId?: number;
  id?: number;
  title: string;
  clean_title?: string;
  genres: string | string[];
  year?: number | string;
  rating?: number;
  avg_rating?: number;
  num_ratings?: number;
  score?: number;
  predicted_rating?: number;
  similarity?: number;
  hybrid_score?: number;
}

interface UserHistoryItem {
  title: string;
  genres: string;
  rating: number;
}

export default function BrowsePage() {
  const [activeTab, setActiveTab] = useState<"collaborative" | "content" | "hybrid" | "popular">("collaborative");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("Inception (2010)");
  const [userId, setUserId] = useState<number>(1);
  const [selectedGenre, setSelectedGenre] = useState("All");
  
  // Date / Release Era Filter
  const [selectedEra, setSelectedEra] = useState<string>("All");

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);

  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [userHistory, setUserHistory] = useState<UserHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<Movie[]>([]);
  const [hybridWeight, setHybridWeight] = useState(0.6); // 60% SVD, 40% Content

  const API_BASE = "http://localhost:5000";

  // Compute year ranges based on selected date set / era
  const getYearParams = () => {
    if (selectedEra === "2015+") return "&start_year=2015";
    if (selectedEra === "2010-2014") return "&start_year=2010&end_year=2014";
    if (selectedEra === "2000s") return "&start_year=2000&end_year=2009";
    if (selectedEra === "1990s") return "&start_year=1990&end_year=1999";
    if (selectedEra === "Classics (<1990)") return "&end_year=1989";
    return "";
  };

  // Reset to page 1 when filter parameters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, selectedGenre, selectedMovie, userId, selectedEra]);

  // Fetch real-time recommendations from dataset
  const fetchRecommendations = async () => {
    setLoading(true);
    const yearParams = getYearParams();
    try {
      let url = "";
      if (activeTab === "collaborative") {
        url = `${API_BASE}/api/recommend/collaborative?user_id=${userId}&page=${currentPage}&page_size=${pageSize}${yearParams}`;
      } else if (activeTab === "content") {
        url = `${API_BASE}/api/recommend/content?title=${encodeURIComponent(selectedMovie)}&page=${currentPage}&page_size=${pageSize}${yearParams}`;
      } else if (activeTab === "hybrid") {
        url = `${API_BASE}/api/recommend/hybrid?title=${encodeURIComponent(selectedMovie)}&user_id=${userId}&page=${currentPage}&page_size=${pageSize}${yearParams}`;
      } else if (activeTab === "popular") {
        url = `${API_BASE}/api/popular?genre=${encodeURIComponent(selectedGenre)}&page=${currentPage}&page_size=${pageSize}${yearParams}`;
      }

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const items = data.recommendations || data.movies || [];
        setRecommendations(items);
        setTotalPages(data.total_pages || 1);
        setTotalResults(data.total_results || items.length);
        if (data.user_history) {
          setUserHistory(data.user_history);
        }
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [activeTab, selectedGenre, selectedMovie, userId, selectedEra, currentPage, pageSize]);

  // Autocomplete search from dataset
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchSuggestions(data.movies || []);
        }
      } catch {
        // Fallback
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const genresList = [
    "All", "Action", "Adventure", "Animation", "Comedy", "Crime",
    "Drama", "Fantasy", "Mystery", "Romance", "Sci-Fi", "Thriller"
  ];

  const eras = [
    { label: "All Eras", value: "All" },
    { label: "Recent (2015+)", value: "2015+" },
    { label: "2010s", value: "2010-2014" },
    { label: "2000s", value: "2000s" },
    { label: "1990s", value: "1990s" },
    { label: "Classics (<1990)", value: "Classics (<1990)" },
  ];

  // Helper to render pagination page numbers
  const renderPageNumbers = () => {
    const pages = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className="w-8 h-8 rounded-lg text-xs font-mono transition-colors border border-white/10 hover:bg-white/10 text-neutral-400"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="dots1" className="text-neutral-500 font-mono text-xs px-1">...</span>);
      }
    }

    for (let p = startPage; p <= endPage; p++) {
      pages.push(
        <button
          key={p}
          onClick={() => setCurrentPage(p)}
          className={`w-8 h-8 rounded-lg text-xs font-mono transition-all ${
            currentPage === p
              ? "bg-white text-black font-bold shadow-lg"
              : "border border-white/10 hover:bg-white/10 text-neutral-300"
          }`}
        >
          {p}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="dots2" className="text-neutral-500 font-mono text-xs px-1">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className="w-8 h-8 rounded-lg text-xs font-mono transition-colors border border-white/10 hover:bg-white/10 text-neutral-400"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-[#070708] text-white selection:bg-white/20 selection:text-white font-sans antialiased overflow-x-hidden pt-24 pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Studio Header & Tab Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
              <span>Real-Time Inference Studio</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-light text-neutral-100 tracking-tight">
              Curated Recommendations
            </h1>
          </div>

          {/* Model Mode Switcher */}
          <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm self-start">
            <button
              onClick={() => setActiveTab("collaborative")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 ${
                activeTab === "collaborative"
                  ? "bg-white text-black font-semibold shadow-lg"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>SVD Collaborative</span>
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 ${
                activeTab === "content"
                  ? "bg-white text-black font-semibold shadow-lg"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Genre Content</span>
            </button>
            <button
              onClick={() => setActiveTab("hybrid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 ${
                activeTab === "hybrid"
                  ? "bg-white text-black font-semibold shadow-lg"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Hybrid Engine</span>
            </button>
            <button
              onClick={() => setActiveTab("popular")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 ${
                activeTab === "popular"
                  ? "bg-white text-black font-semibold shadow-lg"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Top Rated</span>
            </button>
          </div>
        </div>

        {/* Dynamic Controls Bar */}
        <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md mb-8 space-y-5">
          {/* Active Mode Specific Controls */}
          {activeTab === "collaborative" && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-sm font-medium text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-neutral-400" />
                  User Profile Latent Embedding
                </h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Predicts unrated movies from 50 SVD latent preference vectors for user:
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-400">User ID:</span>
                <input
                  type="number"
                  min="1"
                  max="1400"
                  value={userId}
                  onChange={(e) => setUserId(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 px-3 py-1.5 bg-black/60 border border-white/20 rounded-lg text-center text-sm font-mono text-white focus:outline-none focus:border-white"
                />
                <button
                  onClick={() => setUserId(Math.floor(Math.random() * 500) + 1)}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono hover:bg-white/10 text-neutral-300 transition-colors"
                >
                  Randomize User
                </button>
              </div>
            </div>
          )}

          {(activeTab === "content" || activeTab === "hybrid") && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white flex items-center gap-2">
                    <Film className="w-4 h-4 text-neutral-400" />
                    Seed Film Context
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Calculating cosine similarity for: <span className="text-neutral-200 font-mono font-medium">{selectedMovie}</span>
                  </p>
                </div>

                {/* Instant Movie Search */}
                <div className="relative w-full md:w-80">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="Search movie from 62,423 films..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-black/60 border border-white/20 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  {/* Suggestions Popover */}
                  {searchSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#101014] border border-white/20 rounded-xl shadow-2xl overflow-hidden z-30 max-h-60 overflow-y-auto">
                      {searchSuggestions.map((m, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedMovie(m.title);
                            setSearchQuery("");
                            setSearchSuggestions([]);
                          }}
                          className="px-4 py-2.5 hover:bg-white/10 cursor-pointer border-b border-white/5 last:border-0"
                        >
                          <div className="text-xs text-white font-medium">{m.title}</div>
                          <div className="text-[10px] text-neutral-400 font-mono">{typeof m.genres === 'string' ? m.genres : m.genres?.join(', ')}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {activeTab === "hybrid" && (
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Latent Factor vs Genre Balance:</span>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <span className="text-[11px] font-mono text-neutral-400">Content-Heavy</span>
                    <input
                      type="range"
                      min="0.1"
                      max="0.9"
                      step="0.05"
                      value={hybridWeight}
                      onChange={(e) => setHybridWeight(parseFloat(e.target.value))}
                      className="w-40 accent-white cursor-pointer"
                    />
                    <span className="text-[11px] font-mono text-neutral-200">
                      SVD Factor {(hybridWeight * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "popular" && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-mono text-neutral-400 mr-2">Filter Genre:</span>
              {genresList.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGenre(g)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                    selectedGenre === g
                      ? "bg-white text-black font-semibold"
                      : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          )}

          {/* Date / Release Era Filter */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <Calendar className="w-3.5 h-3.5 text-neutral-300" />
              <span>Release Date Filter:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {eras.map((era) => (
                <button
                  key={era.value}
                  onClick={() => setSelectedEra(era.value)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    selectedEra === era.value
                      ? "bg-white text-black font-semibold"
                      : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5"
                  }`}
                >
                  {era.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User History preview for Collaborative Mode */}
        {activeTab === "collaborative" && userHistory.length > 0 && (
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <History className="w-4 h-4 text-neutral-300" />
              <span>User #{userId}&apos;s Rated Films in Dataset:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {userHistory.slice(0, 4).map((h, i) => (
                <span
                  key={i}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-300 flex items-center gap-1.5"
                >
                  <span>{h.title}</span>
                  <span className="text-amber-400 font-bold">★{h.rating}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Pagination Bar Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="text-xs font-mono text-neutral-400">
            Showing{" "}
            <span className="text-white font-semibold">
              {totalResults === 0 ? 0 : (currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalResults)}
            </span>{" "}
            of <span className="text-white font-semibold">{totalResults}</span> real-time dataset recommendations
          </div>

          {/* Items Per Page Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-500">Per Page:</span>
            {[8, 12, 16, 24].map((size) => (
              <button
                key={size}
                onClick={() => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                  pageSize === size
                    ? "bg-white text-black font-semibold"
                    : "border border-white/10 text-neutral-400 hover:text-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-6 h-6 text-neutral-400 animate-spin" />
            <span className="text-xs font-mono text-neutral-400 tracking-wider">
              Computing matrix factorization & ranking candidates...
            </span>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="py-20 text-center border border-white/10 rounded-2xl bg-white/[0.01]">
            <p className="text-sm font-mono text-neutral-400">
              No films found matching this year range and filter combination in the dataset.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((movie, idx) => {
              const genresArr = typeof movie.genres === "string" ? movie.genres.split("|") : (movie.genres || []);
              const globalRank = (currentPage - 1) * pageSize + idx + 1;
              const scoreLabel = movie.predicted_rating 
                ? `★ ${movie.predicted_rating.toFixed(2)}`
                : movie.similarity 
                ? `${(movie.similarity * 100).toFixed(0)}% match`
                : movie.hybrid_score
                ? `${(movie.hybrid_score * 100).toFixed(0)}% score`
                : movie.avg_rating
                ? `★ ${movie.avg_rating.toFixed(1)}`
                : `★ ${(movie.rating || 4.2).toFixed(1)}`;

              return (
                <div
                  key={idx}
                  className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 hover:border-white/30 transition-all duration-500 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/5"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
                        Rank #{globalRank}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/10">
                        {scoreLabel}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-normal text-white group-hover:text-neutral-200 transition-colors line-clamp-2 leading-snug mb-3">
                      {movie.title}
                    </h3>

                    {movie.year && (
                      <div className="text-[11px] font-mono text-neutral-400 mb-3 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-neutral-500" />
                        <span>Release Year: {movie.year}</span>
                        {movie.num_ratings ? (
                          <span className="text-neutral-500 ml-2">({movie.num_ratings} ratings)</span>
                        ) : null}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {genresArr.slice(0, 3).map((g, gIdx) => (
                        <span
                          key={gIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-neutral-400 border border-white/5"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedMovie(movie.title);
                        setActiveTab("content");
                      }}
                      className="text-[11px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 group-hover:underline"
                    >
                      <span>Find Similar</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <a
                      href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-500 hover:text-white transition-colors"
                      title="Search on IMDb"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Separate Page Number Controls (Pagination) */}
        {totalPages > 1 && (
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-neutral-400">
              Page <span className="text-white font-bold">{currentPage}</span> of{" "}
              <span className="text-white font-bold">{totalPages}</span>
            </div>

            {/* Separate Page Numbers Buttons */}
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-neutral-300 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <div className="flex items-center gap-1">
                {renderPageNumbers()}
              </div>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-neutral-300 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
