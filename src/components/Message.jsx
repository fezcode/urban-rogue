import { useEffect, useState, useRef } from 'react';

// Minimal markdown renderer — handles h1, h2, h3, bold, italic, code, hr, tables, lists
function renderMarkdown(text) {
  const lines = text.split('\n');
  const result = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      result.push(<hr key={i} />);
      i++;
      continue;
    }

    // Headers
    if (line.startsWith('# ')) {
      result.push(<h1 key={i}>{inlineFormat(line.slice(2))}</h1>);
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      result.push(<h2 key={i}>{inlineFormat(line.slice(3))}</h2>);
      i++;
      continue;
    }
    if (line.startsWith('### ')) {
      result.push(<h3 key={i}>{inlineFormat(line.slice(4))}</h3>);
      i++;
      continue;
    }

    // Table
    if (line.includes('|') && lines[i + 1]?.includes('---')) {
      const tableLines = [];
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      result.push(renderTable(tableLines, result.length));
      continue;
    }

    // Unordered list
    if (/^[-*]\s/.test(line.trim())) {
      const listItems = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      result.push(
        <ul key={result.length}>
          {listItems.map((item, j) => (
            <li key={j}>{inlineFormat(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Empty line
    if (!line.trim()) {
      i++;
      continue;
    }

    // Paragraph
    result.push(<p key={i}>{inlineFormat(line)}</p>);
    i++;
  }

  return result;
}

function renderTable(lines, key) {
  const headers = lines[0]
    .split('|')
    .map((c) => c.trim())
    .filter(Boolean);
  const rows = lines.slice(2).map((l) =>
    l
      .split('|')
      .map((c) => c.trim())
      .filter(Boolean)
  );

  return (
    <table key={key}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i}>{inlineFormat(h)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{inlineFormat(cell)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function inlineFormat(text) {
  // Process inline markdown: bold, italic, code, emoji
  const parts = [];
  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      parts.push(<strong key={match.index}>{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={match.index}>{match[4]}</em>);
    } else if (match[5]) {
      parts.push(<code key={match.index}>{match[6]}</code>);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function Message({ type, text, isLatest }) {
  const [displayed, setDisplayed] = useState(
    type === 'user' || !isLatest ? text : ''
  );
  const [typing, setTyping] = useState(type === 'system' && isLatest);
  const charIndex = useRef(0);

  useEffect(() => {
    if (type !== 'system' || !isLatest) {
      setDisplayed(text);
      setTyping(false);
      return;
    }

    charIndex.current = 0;
    setDisplayed('');
    setTyping(true);

    const speed = Math.max(2, Math.min(12, 600 / text.length));
    const chunkSize = Math.max(1, Math.ceil(text.length / 150));

    const timer = setInterval(() => {
      charIndex.current += chunkSize;
      if (charIndex.current >= text.length) {
        setDisplayed(text);
        setTyping(false);
        clearInterval(timer);
      } else {
        setDisplayed(text.slice(0, charIndex.current));
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, type, isLatest]);

  if (type === 'user') {
    return <div className="message user">{`> ${text}`}</div>;
  }

  return (
    <div className="message system">
      {renderMarkdown(displayed)}
      {typing && <span className="typewriter-cursor" />}
    </div>
  );
}
