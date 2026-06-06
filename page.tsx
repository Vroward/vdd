@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #0a0a0f; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #ff6b9d, #c77dff); border-radius: 4px; }
}

@layer components {
  .gradient-text {
    @apply bg-gradient-to-r from-nv-pink-bright via-nv-purple to-nv-pink bg-clip-text text-transparent;
  }
  .btn-primary {
    @apply px-6 py-3 bg-gradient-to-r from-nv-pink to-nv-purple text-white font-semibold rounded-xl
           shadow-[0_4px_15px_rgba(255,107,157,0.3)] hover:shadow-[0_6px_25px_rgba(255,107,157,0.5)]
           hover:-translate-y-0.5 transition-all duration-300;
  }
  .btn-secondary {
    @apply px-5 py-2.5 bg-transparent border border-nv-pink/40 text-nv-pink-bright font-semibold rounded-xl
           hover:bg-nv-pink/15 hover:border-nv-pink hover:text-white transition-all duration-300;
  }
  .input-field {
    @apply w-full px-4 py-3 bg-nv-darker border border-nv-border rounded-xl text-white
           placeholder:text-nv-text-muted focus:outline-none focus:border-nv-pink
           focus:shadow-[0_0_0_3px_rgba(255,107,157,0.1)] transition-all duration-300;
  }
}