# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server (frontend + Tauri backend)
- `pnpm build` - Build for production (TypeScript compilation + Vite build)
- `pnpm preview` - Preview production build
- `pnpm tauri dev` - Start Tauri development mode
- `pnpm tauri build` - Build Tauri application for distribution

### Version Management
- `pnpm version` - Sync version between package.json and Tauri config

## Architecture

This is a Tauri desktop application that renders Markdown files with a table of contents. The application follows a hybrid architecture:

**Frontend (React + Vite)**
- Single-page React application using TypeScript
- `src/App.tsx` contains the main markdown viewer component with TOC generation
- Uses `react-markdown` with `remark-gfm` for GitHub-flavored markdown rendering
- Tailwind CSS with Tailwind Typography for styling
- Responsive design with sidebar navigation on desktop

**Backend (Rust + Tauri)**
- `src-tauri/src/main.rs` implements a Tauri command `get_markdown_content`
- Reads markdown files from command line arguments (relative or absolute paths)
- Handles file system access and error handling

**Key Integration Points**
- Frontend invokes `get_markdown_content` via Tauri's `invoke` API
- TOC is generated client-side by parsing markdown headers
- Heading components are enhanced with auto-generated IDs for TOC navigation

The application is designed to be launched with a markdown file path as a command line argument, making it function as a markdown file viewer.