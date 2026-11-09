import { useEffect, useState, type ReactNode } from 'react';
import './App.css';

const LINKEDIN_URL = 'https://www.linkedin.com/in/patrick-hinlopen/';

const TYPE_SPEED_MS = 75;
const PROMPT_PAUSE_MS = 700;

type Step = {
  command: string;
  output: ReactNode;
};

const STEPS: Step[] = [
  {
    command: 'hello world,',
    output: (
      <p>
        welcome to retailmedia.dev, this is my place to experiment with development projects in
        the field of retail media.
      </p>
    ),
  },
  {
    command: 'linkedin',
    output: (
      <p>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          linkedin.com/in/patrick-hinlopen
        </a>
      </p>
    ),
  },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Prompt({ children }: { children?: ReactNode }) {
  return (
    <p className="prompt-line">
      <span aria-hidden="true">C:\&gt; </span>
      {children}
    </p>
  );
}

function Cursor() {
  return <span className="cursor" aria-hidden="true" />;
}

function App() {
  const [step, setStep] = useState(() => (prefersReducedMotion() ? STEPS.length : 0));
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (step >= STEPS.length) return;

    const command = STEPS[step].command;
    const timer =
      chars < command.length
        ? setTimeout(() => setChars((c) => c + 1), chars === 0 ? PROMPT_PAUSE_MS : TYPE_SPEED_MS)
        : setTimeout(() => {
            setStep((s) => s + 1);
            setChars(0);
          }, PROMPT_PAUSE_MS / 2);

    return () => clearTimeout(timer);
  }, [step, chars]);

  return (
    <main className="screen">
      <h1 className="sr-only">retailmedia.dev</h1>

      <section className="block">
        <p>RETAILMEDIA-DOS Version 1.0</p>
        <p className="dim">(C) Copyright retailmedia.dev</p>
      </section>

      {STEPS.slice(0, step + 1).map(({ command, output }, i) => (
        <section className="block" key={command}>
          {i < step ? (
            <>
              <Prompt>{command}</Prompt>
              {output}
            </>
          ) : (
            <Prompt>
              {command.slice(0, chars)}
              <Cursor />
            </Prompt>
          )}
        </section>
      ))}

      {step >= STEPS.length && (
        <section className="block">
          <Prompt>
            <Cursor />
          </Prompt>
        </section>
      )}
    </main>
  );
}

export default App;
