import { resumeItems } from '@/utils/lists';
import { Link } from '@tanstack/react-router';

export const ResumeSidebar = () => (
  <aside className="space-y-6">
    <h1>Why hire me?</h1>
    <p>Built responsive web applications delivering</p>
    <nav className="flex flex-col gap-4">
      {resumeItems.map(({ href, label }) => (
        <Link
          key={href}
          to={href}
          className="text-center p-2 rounded-md hover:bg-secondary hover:text-background focus:bg-primary focus:text-foreground bg-gray"
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
