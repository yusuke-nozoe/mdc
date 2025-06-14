import ReactMarkdown from 'react-markdown';

const markdownText = `
# Hello Markdown

This is a **markdown** preview using Tauri + React.
`;

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <ReactMarkdown>{markdownText}</ReactMarkdown>
    </div>
  );
}
