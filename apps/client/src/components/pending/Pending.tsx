import Footer from '@/features/footer';
import Header from '@/features/header';

export const Pending = () => (
  <>
    <Header />
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <svg
          className="animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 200 200"
          fill="none"
        >
          <defs>
            <linearGradient id="spinner-firstHalf">
              <stop offset="0%" stopOpacity="1" stopColor="currentColor" />
              <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
            </linearGradient>
            <linearGradient id="spinner-secondHalf">
              <stop offset="0%" stopOpacity="0" stopColor="currentColor" />
              <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
            </linearGradient>
          </defs>
          <g strokeWidth="12">
            <path
              stroke="url(#spinner-secondHalf)"
              d="M 4 100 A 96 96 0 0 1 196 100"
            />
            <path
              stroke="url(#spinner-firstHalf)"
              d="M 196 100 A 96 96 0 0 1 4 100"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              d="M 4 100 A 96 96 0 0 1 4 98"
            />
          </g>
        </svg>
        <p>Loading...</p>
      </div>
    </main>
    <Footer />
  </>
);
