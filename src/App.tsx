import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import ReactMarkdown from 'react-markdown';
import './App.css';

export default function App() {
  const [markdownText, setMarkdownText] = useState<string>('Loading...');

  useEffect(() => {
    invoke<string>('get_markdown_content').then(content => {
      setMarkdownText(content);
    });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <article className="prose prose-lg prose-slate dark:prose-invert">
          <ReactMarkdown>{markdownText}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}

