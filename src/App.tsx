import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import ReactMarkdown from 'react-markdown';

export default function App() {
  const [markdownText, setMarkdownText] = useState<string>('Loading...');

  useEffect(() => {
    invoke<string>('get_markdown_content').then(content => {
      setMarkdownText(content);
    });
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <ReactMarkdown>{markdownText}</ReactMarkdown>
    </div>
  );
}

