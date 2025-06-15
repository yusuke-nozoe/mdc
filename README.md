# MDC - Markdown Document Viewer

A modern, lightweight desktop application for viewing Markdown files with an auto-generated table of contents. Built with Tauri, React, and TypeScript.

## Features

- 📄 **Clean Markdown Rendering**: Beautifully rendered Markdown with GitHub-flavored markdown support
- 📋 **Auto-generated Table of Contents**: Automatically generates navigation from your document headers
- 🎨 **Modern UI**: Clean, responsive design with dark/light mode support
- 🖱️ **Easy File Selection**: Click-to-select interface for choosing Markdown files
- ⚡ **Fast & Lightweight**: Built with Tauri for optimal performance
- 🔄 **File Switching**: Quick file switching with the floating file selector button

## Installation

### Homebrew (macOS)

```bash
brew tap zoetin45/tap
brew install mdc
```

### Manual Installation

1. Download the latest release from the [releases page](https://github.com/zoetin45/mdc/releases)
2. Install the appropriate package for your platform:
   - **macOS**: Download and mount the `.dmg` file, then drag MDC to Applications
   - **Windows**: Run the `.msi` installer
   - **Linux**: Install the `.deb` or `.AppImage` file

## Usage

### Launch with file selection
```bash
mdc
```
Click anywhere on the welcome screen to select a Markdown file to view.

### Launch with specific file
```bash
mdc path/to/your/document.md
```

### Change files
When viewing a document, click the file icon in the top-right corner to select a different Markdown file.

## Development

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/)
- [Rust](https://rustup.rs/)

### Setup
```bash
git clone https://github.com/zoetin45/mdc.git
cd mdc
pnpm install
```

### Development mode
```bash
pnpm tauri dev
```

### Build for production
```bash
pnpm tauri build
```

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + Tailwind Typography
- **Desktop Framework**: Tauri
- **Markdown Rendering**: react-markdown + remark-gfm
- **Backend**: Rust

## License

MIT License - see [LICENSE](LICENSE) file for details.
