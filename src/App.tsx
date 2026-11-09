import { useEffect, useState, type ReactNode } from 'react';
import './App.css';

const LINKEDIN_URL = 'https://www.linkedin.com/in/patrick-hinlopen/';

const TYPE_SPEED_MS = 75;
const PROMPT_PAUSE_MS = 700;
const BOOT_DELAY_MS = 1100;

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

function Prompt({ pending, children }: { pending?: boolean; children?: ReactNode }) {
  return (
    <p className={pending ? 'prompt-line pending' : 'prompt-line'}>
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
  const [booted, setBooted] = useState(() => prefersReducedMotion());
  const done = step >= STEPS.length;

  useEffect(() => {
    if (booted) return;
    const timer = setTimeout(() => setBooted(true), BOOT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [booted]);

  useEffect(() => {
    if (!booted || done) return;

    const command = STEPS[step].command;
    const timer =
      chars < command.length
        ? setTimeout(() => setChars((c) => c + 1), chars === 0 ? PROMPT_PAUSE_MS : TYPE_SPEED_MS)
        : setTimeout(() => {
            setStep((s) => s + 1);
            setChars(0);
          }, PROMPT_PAUSE_MS / 2);

    return () => clearTimeout(timer);
  }, [booted, done, step, chars]);

  return (
    <main className="stage">
      <h1 className="sr-only">retailmedia.dev</h1>

      <div className="machine">
        <div className="case">
          <div className="bezel">
            <div className="crt">
              {/*
                Every line is always laid out so the screen never resizes while typing;
                lines that haven't "happened" yet are just invisible.
              */}
              <div className="terminal">
                <section className="block">
                  <p>RETAILMEDIA-DOS Version 1.0</p>
                  <p className="dim">(C) Copyright retailmedia.dev</p>
                </section>

                {STEPS.map(({ command, output }, i) => {
                  const typing = i === step;
                  const typed = i < step ? command.length : typing ? chars : 0;
                  return (
                    <section className="block" key={command}>
                      <Prompt pending={i > step}>
                        {command.slice(0, typed)}
                        {typing && <Cursor />}
                        <span className="pending">{command.slice(typed)}</span>
                      </Prompt>
                      <div className={i < step ? undefined : 'pending'}>{output}</div>
                    </section>
                  );
                })}

                <section className="block">
                  <Prompt pending={!done}>
                    <Cursor />
                  </Prompt>
                </section>
              </div>
            </div>
          </div>

          <div className="chin">
            <span className="badge">retailmedia</span>
            <span className="floppy" aria-hidden="true" />
          </div>
        </div>
        <div className="base" aria-hidden="true" />
      </div>
    </main>
  );
}

export default App;
