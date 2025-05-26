import { cn } from '@/lib/utils';
import { cornerSketches } from '@/utils/lists';

export const AccentFrame = ({ className }: { className: string }) => (
  <aside className="fixed inset-0 z-10 pointer-events-none mt-[4.3rem]">
    {Object.entries(cornerSketches).map(([key, { h, v, styleH, styleV }]) => (
      <div key={key}>
        <svg
          viewBox="0 0 60 10"
          className={cn('absolute', styleH)}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={h}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            className={cn('stroke-current', className)}
          />
        </svg>
        <svg
          viewBox="0 0 10 60"
          className={cn('absolute', styleV)}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={v}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            className={cn('stroke-current', className)}
          />
        </svg>
      </div>
    ))}
  </aside>
);
