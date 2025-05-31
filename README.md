# Task Manager with NedaraJS

[Check out the demo app here 🔥](https://nedara-project.github.io/nedarajs-demo/)

## Overview

This project is a demo application showcasing the capabilities of [NedaraJS](https://github.com/Nedara-Project/nedarajs), a lightweight JavaScript framework for component-based web development. The Task Manager demonstrates how to build a responsive, single-page application with NedaraJS, including features like:

- Task creation and management
- Priority-based organization
- Filtering and statistics
- Local storage persistence
- Dark/light theme support

## About NedaraJS

NedaraJS is a minimalist JavaScript framework designed to simplify widget management in web applications. Key features include:

- Lightweight component system
- Powerful templating engine
- Event management utilities
- jQuery integration
- Easy state management

[Explore NedaraJS on GitHub](https://github.com/Nedara-Project/nedarajs)

## Development Setup

### Quick Start

1. Clone this repository
2. Initialize the framework submodule with `git submodule update --init --recursive`
3. Open the project in VS Code
4. Install the [Live Server extension](https://github.com/ritwickdey/vscode-live-server)
5. Click on "Go Live" from `index.html`

### Why Live Server?

During development, I recommend using the VS Code Live Server extension because:

- It serves assets via HTTP (required for template loading)
- Provides automatic reloading
- Simulates a real web server environment
- Makes development faster and simpler

### Project Structure

```
nedarajs-demo/
├── index.html # Main application entry
├── css/
│ └── styles.css # All styles with dark/light theme
├── js/
│ ├── nedara.js # NedaraJS framework (Git Submodule)
│ └── app.js # Application logic
└── templates/
└── tasks.html # HTML templates
```

## Features

- 🎨 Automatic dark/light theme based on system preferences
- 📊 Real-time task statistics
- 🔍 Filter tasks by status or priority
- 💾 Local storage persistence
- 📱 Fully responsive design

## License

MIT License - see the [LICENSE](LICENSE) file for details.
