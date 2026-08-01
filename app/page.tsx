"use client";

import { useMemo, useState } from "react";

type Choice = {
  id: string;
  text: string;
  serviceChange: number;
  accuracyChange: number;
  result: "Strong choice" | "Partially effective" | "Coaching opportunity";
  feedback: string;
};

type Scenario = {
  name: string;
  reason: string;
  mood: string;
  prompt: string;
  choices: Choice[];
};

const scenarios: Scenario[] = [
  {
    name: "Maria Torres",
    reason: "A duplicate charge appears on her latest statement.",
    mood: "Concerned, patient, and looking for reassurance.",
    prompt: "Choose the best response to begin the call.",
    choices: [
      {
        id: "a",
        text: "I can help with that. Let me review the two charges with you and explain what I find.",
        serviceChange: 10,
        accuracyChange: 10,
        result: "Strong choice",
        feedback:
          "You acknowledged the concern, took ownership, and described a clear next step without assigning blame.",
      },
      {
        id: "b",
        text: "You will need to contact your bank because duplicate charges are usually their responsibility.",
        serviceChange: -6,
        accuracyChange: -4,
        result: "Coaching opportunity",
        feedback:
          "The response redirects the caller before reviewing the account. First confirm what happened and explain the available options.",
      },
      {
        id: "c",
        text: "Please wait while I transfer you to another department.",
        serviceChange: -4,
        accuracyChange: 0,
        result: "Coaching opportunity",
        feedback:
          "A transfer may be needed later, but beginning with one creates extra effort for the caller and does not clarify the issue.",
      },
    ],
  },
  {
    name: "Daniel Reed",
    reason: "He has waited several days for an update on a service request.",
    mood: "Frustrated and speaking quickly.",
    prompt: "Choose the response that balances empathy and action.",
    choices: [
      {
        id: "a",
        text: "I understand you want an update, but these requests can take time.",
        serviceChange: 1,
        accuracyChange: 2,
        result: "Partially effective",
        feedback:
          "You recognized the concern, but the response does not take ownership or explain what you will do next.",
      },
      {
        id: "b",
        text: "I am sorry you have been waiting. I will review the request history now and give you the clearest status available.",
        serviceChange: 10,
        accuracyChange: 8,
        result: "Strong choice",
        feedback:
          "You acknowledged the delay, set a specific action, and avoided promising an outcome before reviewing the record.",
      },
      {
        id: "c",
        text: "The request is still open, so there is nothing else I can tell you today.",
        serviceChange: -8,
        accuracyChange: -2,
        result: "Coaching opportunity",
        feedback:
          "The statement may be technically true, but it closes the conversation without checking for useful details or next steps.",
      },
    ],
  },
  {
    name: "Priya Shah",
    reason: "She wants to change the mailing address on her account.",
    mood: "Friendly and in a hurry.",
    prompt: "Choose the best response before changing account information.",
    choices: [
      {
        id: "a",
        text: "I can update that quickly. What is the new address?",
        serviceChange: 4,
        accuracyChange: -10,
        result: "Coaching opportunity",
        feedback:
          "The response is efficient, but it skips identity verification before changing protected account information.",
      },
      {
        id: "b",
        text: "For account security, I need to verify your identity first. Then I can help update the address.",
        serviceChange: 8,
        accuracyChange: 10,
        result: "Strong choice",
        feedback:
          "You explained the reason for verification and connected it directly to the caller's requested outcome.",
      },
      {
        id: "c",
        text: "Address changes cannot be completed by phone. You will need to submit a written request.",
        serviceChange: -6,
        accuracyChange: -5,
        result: "Coaching opportunity",
        feedback:
          "Do not introduce a restriction without checking the approved process. Explain the security step and use the available workflow.",
      },
    ],
  },
  {
    name: "Robert Chen",
    reason: "He is unsure which date on his statement is the payment deadline.",
    mood: "Calm, but confused by the wording.",
    prompt: "Choose the response that confirms understanding.",
    choices: [
      {
        id: "a",
        text: "The due date is listed in the payment summary section of your statement.",
        serviceChange: 2,
        accuracyChange: 5,
        result: "Partially effective",
        feedback:
          "The location is accurate, but the caller still has to interpret the statement alone. Provide the date and confirm understanding.",
      },
      {
        id: "b",
        text: "Your payment is due on the 18th. Please look at the payment summary with me. Do you see that date now?",
        serviceChange: 10,
        accuracyChange: 10,
        result: "Strong choice",
        feedback:
          "You gave a direct answer, showed where to find it, and checked that the caller could locate the information independently.",
      },
      {
        id: "c",
        text: "The statement includes several dates, so use the latest date shown.",
        serviceChange: -5,
        accuracyChange: -8,
        result: "Coaching opportunity",
        feedback:
          "The latest date is not necessarily the deadline. Identify the labeled due date and verify the caller understands it.",
      },
    ],
  },
];

function clampScore(score: number) {
  return Math.min(100, Math.max(0, score));
}

function scoreLabel(score: number) {
  if (score >= 85) return "Ready to apply";
  if (score >= 70) return "Developing consistency";
  return "More practice recommended";
}

export default function Home() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [complete, setComplete] = useState(false);
  const [serviceQuality, setServiceQuality] = useState(60);
  const [callAccuracy, setCallAccuracy] = useState(60);

  const scenario = scenarios[scenarioIndex];
  const selected = useMemo(
    () => scenario.choices.find((choice) => choice.id === selectedChoice),
    [scenario, selectedChoice],
  );

  function submitResponse() {
    if (!selected || submitted) return;
    setServiceQuality((score) => clampScore(score + selected.serviceChange));
    setCallAccuracy((score) => clampScore(score + selected.accuracyChange));
    setSubmitted(true);
  }

  function continueSimulation() {
    if (scenarioIndex === scenarios.length - 1) {
      setComplete(true);
      return;
    }
    setScenarioIndex((index) => index + 1);
    setSelectedChoice("");
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restartSimulation() {
    setScenarioIndex(0);
    setSelectedChoice("");
    setSubmitted(false);
    setComplete(false);
    setServiceQuality(60);
    setCallAccuracy(60);
  }

  if (complete) {
    const overall = Math.round((serviceQuality + callAccuracy) / 2);
    return (
      <main className="app-shell results-shell">
        <section className="results-card" aria-labelledby="results-title">
          <p className="eyebrow">Simulation complete</p>
          <h1 id="results-title">Your coaching results</h1>
          <p className="results-intro">
            You practiced four calls that required empathy, ownership, process
            accuracy, and clear next steps.
          </p>

          <div className="overall-score" aria-label={`Overall score ${overall}`}>
            <span>{overall}</span>
            <small>Overall score</small>
          </div>

          <div className="final-metrics">
            <ScoreCard
              label="Service Quality"
              score={serviceQuality}
              tone="green"
            />
            <ScoreCard
              label="Call Accuracy"
              score={callAccuracy}
              tone="blue"
            />
          </div>

          <div className="result-summary">
            <h2>{scoreLabel(overall)}</h2>
            <p>
              Review any coaching opportunities, then run the simulation again
              to compare your decisions.
            </p>
          </div>

          <button className="primary-button restart-button" onClick={restartSimulation}>
            Practice again
          </button>
          <p className="portfolio-note">
            Generic portfolio demonstration. No employer or customer data is used.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Interactive practice</p>
          <h1>Call Center Coaching Simulator</h1>
        </div>
        <p className="header-note">Balance service quality with call accuracy.</p>
      </header>

      <nav className="progress" aria-label="Scenario progress">
        <ol>
          {scenarios.map((_, index) => (
            <li
              key={index}
              className={
                index === scenarioIndex
                  ? "current"
                  : index < scenarioIndex
                    ? "complete"
                    : ""
              }
              aria-current={index === scenarioIndex ? "step" : undefined}
            >
              <span>{index + 1}</span>
            </li>
          ))}
        </ol>
        <p>
          Scenario {scenarioIndex + 1} of {scenarios.length}
        </p>
      </nav>

      <section className="simulation-grid">
        <aside className="caller-card" aria-labelledby="caller-context-title">
          <div className="caller-card-title">
            <span className="headset-icon" aria-hidden="true">CC</span>
            <h2 id="caller-context-title">Caller Context</h2>
          </div>
          <dl>
            <div>
              <dt>Name</dt>
              <dd>{scenario.name}</dd>
            </div>
            <div>
              <dt>Reason for calling</dt>
              <dd>{scenario.reason}</dd>
            </div>
            <div>
              <dt>Caller mood</dt>
              <dd>{scenario.mood}</dd>
            </div>
          </dl>
        </aside>

        <section className="response-panel" aria-labelledby="response-title">
          <p className="scenario-kicker">Decision point</p>
          <h2 id="response-title">{scenario.prompt}</h2>
          <fieldset disabled={submitted}>
            <legend className="sr-only">Response choices</legend>
            <div className="choice-list">
              {scenario.choices.map((choice, index) => {
                const isSelected = selectedChoice === choice.id;
                return (
                  <label
                    className={`choice-card ${isSelected ? "selected" : ""}`}
                    key={choice.id}
                  >
                    <span className="choice-letter" aria-hidden="true">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <input
                      type="radio"
                      name="response"
                      value={choice.id}
                      checked={isSelected}
                      onChange={(event) => setSelectedChoice(event.target.value)}
                    />
                    <span className="custom-radio" aria-hidden="true" />
                    <span className="choice-text">{choice.text}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {submitted && selected && (
            <section
              className={`feedback-card ${selected.result.toLowerCase().replaceAll(" ", "-")}`}
              aria-live="polite"
            >
              <p className="feedback-label">Coach feedback</p>
              <h3>{selected.result}</h3>
              <p>{selected.feedback}</p>
              <div className="score-changes" aria-label="Score changes">
                <span>Service {formatChange(selected.serviceChange)}</span>
                <span>Accuracy {formatChange(selected.accuracyChange)}</span>
              </div>
            </section>
          )}
        </section>
      </section>

      <section className="score-bar" aria-label="Current performance scores">
        <ScoreCard label="Service Quality" score={serviceQuality} tone="green" />
        <ScoreCard label="Call Accuracy" score={callAccuracy} tone="blue" />
        {!submitted ? (
          <button
            className="primary-button"
            onClick={submitResponse}
            disabled={!selectedChoice}
          >
            Submit response
          </button>
        ) : (
          <button className="primary-button" onClick={continueSimulation}>
            {scenarioIndex === scenarios.length - 1
              ? "View results"
              : "Next scenario"}
          </button>
        )}
      </section>

      <footer>
        Generic portfolio demonstration. No employer or customer data is used.
      </footer>
    </main>
  );
}

function formatChange(value: number) {
  return value > 0 ? `+${value}` : `${value}`;
}

function ScoreCard({
  label,
  score,
  tone,
}: {
  label: string;
  score: number;
  tone: "green" | "blue";
}) {
  return (
    <div className={`score-card ${tone}`}>
      <div className="score-heading">
        <span>{label}</span>
        <strong>{score}</strong>
      </div>
      <div
        className="meter-track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={score}
      >
        <span style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
