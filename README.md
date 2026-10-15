# 🎬 CineMatch — AI Movie Recommendation Engine

> **Cinematic Taste Reshaped by Particles**  
> An intelligent movie recommendation platform combining **Truncated SVD Matrix Factorization** with real-time **WebGL2 GPU particle dynamics** over 62,423 titles from the MovieLens benchmark.

---

## 🌟 Overview

**CineMatch** is a modern movie recommendation system featuring an editorial design and a GPU-accelerated liquid particle hero. The system solves the challenges of matrix sparsity, the cold-start problem, and user taste modeling using four distinct algorithmic approaches:

1. **Collaborative Filtering (Truncated SVD)**: Decomposes sparse interaction matrices into 50 latent preference dimensions.
2. **Content-Based Filtering (Cosine Similarity)**: Multi-hot genre vector embeddings for stylistic matching.
3. **Hybrid Fusion Engine**: Dynamically weighted convex combination of collaborative and content scores.
4. **Bayesian Weighted Leaderboards**: Confidence-weighted mean scoring across genres.

---

## ✨ Features

- **Liquid Sculpture Hero**: 100,000 GPU-simulated WebGL2 particles that turn liquid under cursor interaction and re-assemble into form.
- **Dedicated Browse Studio (`/browse`)**:
  - **Numerical Pagination**: Dedicated page number navigation (`[1]`, `[2]`, `[3]`, `...`, `[Last]`) with custom page sizing (`8`, `12`, `16`, `24`).
  - **Release Date Filters**: Instant filtering by era (*Recent 2015+*, *2010s*, *2000s*, *1990s*, *Classics <1990*).
  - **Real-Time Autocomplete Search**: Sub-string and title lookup across 62,423 movies.
  - **User Profile Latent Analysis**: Inspect any user's past 5★ ratings from the dataset alongside personalized predictions.
- **Dataset & Analysis Process (`/analysis`)**:
  - Full schema documentation for `movies.csv` and `ratings.csv`.
  - Detailed 5-step pipeline: Ingestion, Truncated SVD, Cosine Vectorization, Hybrid Fusion, and Metric Validation.
  - Live model metrics: RMSE: `2.175`, MAE: `1.842`, `44.5%` variance explained across 50 components.
- **Vercel Cloud Ready**: Built-in resilient fallback dataset so the live frontend functions smoothly on serverless cloud platforms.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) architecture (`/components/ui`)
- **Shaders / Graphics**: WebGL2 GPGPU particle physics simulation in GLSL
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend & Machine Learning
- **API**: [Flask](https://flask.palletsprojects.com/) with Flask-CORS
- **Matrix Decomposition**: [Scikit-learn](https://scikit-learn.org/) `TruncatedSVD`
- **Sparse Algebra**: [SciPy](https://scipy.org/) `csr_matrix` (Compressed Sparse Row)
- **Data Ingestion**: [Pandas](https://pandas.pydata.org/) & [NumPy](https://numpy.org/)
- **Dataset**: MovieLens Benchmark (62,423 movies, 25,000,000 ratings)

---

## 🚀 Quick Start (Local Setup)

### 1. Prerequisites
- **Node.js**: v18+ (v20+ recommended)
- **Python**: v3.10+

### 2. Clone Repository
```bash
git clone https://github.com/SHAIKH-MOHAMMED-ASAD/cinematch.git
cd cinematch
```

### 3. Run the Next.js Frontend
```bash
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. (Optional) Run the Flask API Backend
To power real-time training directly from disk:
```bash
pip install -r requirements.txt
python app.py
```
Backend API will be live on **[http://localhost:5000](http://localhost:5000)**.

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Global typography & root metadata
│   │   ├── globals.css        # Tailwind CSS styles
│   │   ├── page.tsx           # Home landing page with Liquid Sculpture Hero
│   │   ├── browse/
│   │   │   └── page.tsx       # Dedicated Browse Studio with numerical pagination
│   │   └── analysis/
│   │       └── page.tsx       # Dataset schema & 5-step analytical pipeline
│   ├── components/
│   │   ├── Navbar.tsx         # Unified dark navigation header
│   │   ├── demo.tsx           # Standalone hero wrapper
│   │   └── ui/
│   │       └── liquid-sculpture-hero.tsx # WebGL2 GPGPU particle simulation
│   └── lib/
│       └── utils.ts           # shadcn `cn` utility
├── components.json            # shadcn CLI configuration
├── package.json               # Dependencies & scripts
└── tsconfig.json              # TypeScript paths (@/* -> ./src/*)
```

---

## ☁️ Deployment on Vercel

1. Push this repository to your GitHub account:
   ```bash
   git branch -M main
   git push -u origin main
   ```
2. Navigate to **[vercel.com/new](https://vercel.com/new)**.
3. Import your `cinematch` repository.
4. Click **Deploy**. Vercel will build the production bundle automatically with zero extra configuration.

---

## 📄 License

This project is licensed under the MIT License.
