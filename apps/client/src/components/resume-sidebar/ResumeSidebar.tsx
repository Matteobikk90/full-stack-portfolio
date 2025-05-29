import { resumeItems } from '@/utils/lists';
import { Link } from '@tanstack/react-router';

export const ResumeSidebar = () => (
  <aside className="space-y-6">
    <h1>Why hire me?</h1>
    <p>tcfghvjbkngfchvjbnkm</p>
    <nav className="flex flex-col gap-4">
      {resumeItems.map(({ href, label }) => (
        <Link
          key={href}
          to={href}
          className="text-center p-2 rounded-md hover:bg-resume hover:text-foreground focus:bg-resume focus:text-foreground bg-foreground/80 text-background"
          activeProps={{
            className: 'bg-resume text-foreground',
          }}
        >
          {label}
        </Link>
      ))}
    </nav>
  </aside>
);
