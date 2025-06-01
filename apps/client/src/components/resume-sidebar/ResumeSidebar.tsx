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
          className="text-center p-2 rounded-md hover:bg-primary hover:text-foreground focus:bg-primary focus:text-foreground bg-gray text-foreground"
          activeProps={{
            className: 'bg-primary text-foreground',
          }}
        >
          {label}
        </Link>
      ))}
    </nav>
  </aside>
);
