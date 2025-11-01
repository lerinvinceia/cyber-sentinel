import React, { useEffect, useRef, useState } from 'react';
import './about.css'; // You'll need to create this CSS file

const codeLines = [
  '// 👁️‍🗨️ Cyber Sentinel - Usage Guide',
  '',
  "import { initSentinel, trackLoginAttempt } from 'cyber-sentinel';",
  '',
  '// 1. Initialize with your credentials in the app entry point (e.g., app.js)',
  ' useEffect(() => {',
  'initSentinel({',
  "  apiUrl: 'https://your-api-endpoint.com',",
  "  appId: 'YOUR_APP_ID',",
  '});[]);',
  '',
  '// 2. Track login attempts (use this inside your onsubmit handler)',
  'trackLoginAttempt();',
  '',
  '// DevTools, DOM, and Storage monitoring start automatically.',
  '',
  '',
  
  '// Stay safe and watch your back with Cyber Sentinel! 🛡️',
];

export default function About() {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const containerRef = useRef(null);
  const fullCode = displayedLines.join('\n') + '\n' + currentText;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines, currentText]);

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) return;

    if (charIndex < codeLines[currentLineIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + codeLines[currentLineIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentText]);
        setCurrentLineIndex((prev) => prev + 1);
        setCharIndex(0);
        setCurrentText('');
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentLineIndex, currentText]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullCode);
      alert('Code copied to clipboard!');
    } catch {
      alert('Copy failed. Try manually.');
    }
  };

  return (
    <div className="about-page">
      <div className="terminal-box">
        <div className="header">
          <h1>Cyber Sentinel - About & Setup</h1>
          <button className="copy-button" onClick={handleCopy}>Copy</button>
        </div>
        <div className="code-area" ref={containerRef}>
          <pre>
            {displayedLines.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
            {currentText && (
              <div>{currentText}<span className="cursor">|</span></div>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
