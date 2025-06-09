import { resumeItems } from '@/utils/lists';
import { Link } from '@tanstack/react-router';

export const ResumeSidebar = () => (
  <aside className="space-y-6">
    <h1 className="text-left">Why hire me?</h1>
    <p>
      Building performant and responsive web applications for the modern web.
    </p>
    <nav className="grid grid-cols-2 lg:flex flex-col gap-4">
      {resumeItems.map(({ href, label }) => (
        <Link
          key={href}
          to={href}
          className="text-center p-2 rounded-md hover:bg-secondary hover:text-background bg-gray"
          activeProps={{
            className: 'bg-secondary text-background',
          }}
        >
          {label}
        </Link>
      ))}
    </nav>
  </aside>
);
