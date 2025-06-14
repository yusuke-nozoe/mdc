import React, { useEffect, useState, useMemo } from 'react';
import { invoke } from '@tauri-apps/api/core';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './App.css';

interface TocItem {
  level: number;
  text: string;
  id: string;
}

const generateToc = (markdown: string): TocItem[] => {
  // コードブロックを除去
  const withoutCodeBlocks = markdown.replace(/```[\s\S]*?```/g, '');
  
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(withoutCodeBlocks)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    
    toc.push({ level, text, id });
  }

  return toc;
};

const TocComponent: React.FC<{ toc: TocItem[] }> = ({ toc }) => {
  if (toc.length === 0) return null;

  return (
    <nav className="toc">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">目次</h3>
      <ul className="space-y-2">
        {toc.map((item, index) => (
          <li key={index} style={{ marginLeft: `${(item.level - 1) * 16}px` }}>
            <a
              href={`#${item.id}`}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 block py-1"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default function App() {
  const [markdownText, setMarkdownText] = useState<string>('Loading...');

  useEffect(() => {
    invoke<string>('get_markdown_content').then(content => {
      setMarkdownText(content);
    });
  }, []);

  const toc = useMemo(() => generateToc(markdownText), [markdownText]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="lg:flex lg:gap-8">
          {/* TOC - Desktop only */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-12 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <TocComponent toc={toc} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 lg:min-w-0">
            <article className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children, ...props }) => (
                    <h1 id={String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')} {...props}>
                      {children}
                    </h1>
                  ),
                  h2: ({ children, ...props }) => (
                    <h2 id={String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')} {...props}>
                      {children}
                    </h2>
                  ),
                  h3: ({ children, ...props }) => (
                    <h3 id={String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')} {...props}>
                      {children}
                    </h3>
                  ),
                  h4: ({ children, ...props }) => (
                    <h4 id={String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')} {...props}>
                      {children}
                    </h4>
                  ),
                  h5: ({ children, ...props }) => (
                    <h5 id={String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')} {...props}>
                      {children}
                    </h5>
                  ),
                  h6: ({ children, ...props }) => (
                    <h6 id={String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')} {...props}>
                      {children}
                    </h6>
                  ),
                }}
              >
                {markdownText}
              </ReactMarkdown>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}

