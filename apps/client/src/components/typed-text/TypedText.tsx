import { ReactTyped } from 'react-typed';

export const TypedText = ({ text }: { text: string[] }) => (
  <ReactTyped
    strings={text}
    typeSpeed={60}
    backSpeed={40}
    backDelay={1000}
    loop
    smartBackspace
    showCursor
    cursorChar="|"
  />
);
