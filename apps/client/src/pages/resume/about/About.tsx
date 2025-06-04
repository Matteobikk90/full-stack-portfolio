import { Button } from '@/lib/ui/button';
import { handleDownload } from '@/utils/download';
import { aboutInfo } from '@/utils/lists';
import { FilePdfIcon } from '@phosphor-icons/react';
import { Label } from '@radix-ui/react-label';

export const About = () => (
  <section className="flex flex-col gap-6 animate-fade-up">
    <h2>About me</h2>
    <p>
      Built responsive web applications delivering real-time data and
      projections out to 2030.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
      {aboutInfo.map(({ label, value }) => (
        <div
          key={label}
          className="flex justify-between items-center sm:justify-start gap-2"
        >
          <Label className="text-foreground/50">{label}:</Label>
          <h3 className="font-medium mb-0.5">{value}</h3>
        </div>
      ))}
    </div>
    <Button
      onClick={handleDownload}
      className="flex items-center gap-2 p-4 rounded-md max-w-max animate-bounce"
    >
      Download CV
      <FilePdfIcon className="size-5" weight="duotone" />
    </Button>
  </section>
);
