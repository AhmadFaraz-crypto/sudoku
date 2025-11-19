# 🎯 Sudoku Game

A modern, interactive Sudoku game built with React and TypeScript. Challenge yourself with multiple difficulty levels, use hints strategically, and enjoy a beautiful, responsive user interface.

![Sudoku Game](https://img.shields.io/badge/React-18.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-4.9.4-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **Multiple Difficulty Levels**: Choose from Easy, Medium, Hard, Expert, Master, and Extreme
- **Hint System**: Get up to 3 hints per game to help you solve challenging puzzles
- **Smart Validation**: Real-time validation with visual feedback for correct and incorrect entries
- **Wrong Attempt Tracking**: Get notified after 5 wrong attempts with an option to restart
- **Winning Animation**: Celebrate your victory with a beautiful animated celebration
- **Responsive Design**: Play seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations and transitions
- **TypeScript**: Fully typed for better code quality and developer experience

## 🎮 How to Play

The goal of Sudoku is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids (called "boxes") contains all of the digits from 1 to 9.

### Rules:
- Each row must contain the digits 1-9 exactly once
- Each column must contain the digits 1-9 exactly once
- Each 3×3 box must contain the digits 1-9 exactly once
- The same digit cannot appear twice in the same row, column, or box

### Game Controls:
1. **Select a cell**: Click on any empty cell to select it
2. **Enter a number**: Use the number pad on the right to input numbers (1-9)
3. **Get hints**: Click the hint button (💡) to reveal a random empty cell (limited to 3 hints per game)
4. **Check your progress**: Correct entries are validated in real-time
5. **Win the game**: Complete all 81 cells correctly to see the winning animation!

## 🚀 Quick Start

### Prerequisites

- Node.js v16.15.1 or higher
- npm v5 or higher (or yarn)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AhmadFaraz-crypto/sudoku.git
   cd sudoku
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000)

4. **Run tests**
   ```bash
   npm test
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
sudoku/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── GameBoard.tsx   # Main game grid
│   │   ├── NumberPad.tsx   # Number input pad
│   │   ├── DifficultySelector.tsx  # Difficulty selection
│   │   ├── GameControls.tsx        # Game controls panel
│   │   ├── RestartPopup/           # Restart popup component
│   │   └── WinningAnimation/       # Winning animation component
│   ├── constants/          # Game constants
│   │   ├── patterns.ts     # Sudoku patterns
│   │   ├── rows.ts         # Row definitions
│   │   └── cols.ts         # Column definitions
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── App.tsx             # Main app component
├── scripts/                # Utility scripts
│   └── generate-valid-patterns.js  # Pattern generator
└── package.json
```

## 🎯 Game Logic

The game uses pre-generated valid Sudoku patterns stored in `src/constants/patterns.ts`. Each pattern is a complete, valid Sudoku solution that follows all Sudoku rules.

### How it works:

1. **Pattern Selection**: A random pattern is selected based on the chosen difficulty level
2. **Cell Pre-filling**: A subset of cells (based on difficulty) are pre-filled with correct values
3. **User Input**: When a user enters a value, it's validated against the pattern
4. **Real-time Feedback**: 
   - Correct values are accepted
   - Incorrect values are highlighted in red
   - Wrong attempts are tracked
5. **Win Detection**: The game checks if all 81 cells are filled correctly

### Difficulty Levels:

- **Easy**: 40-45 pre-filled cells
- **Medium**: 30-35 pre-filled cells
- **Hard**: 20-25 pre-filled cells
- **Expert**: 17-19 pre-filled cells
- **Master**: 15-17 pre-filled cells
- **Extreme**: 13-15 pre-filled cells

## 🛠️ Technology Stack

- **React 18.2.0** - UI library
- **TypeScript 4.9.4** - Type safety
- **React Scripts 5.0.1** - Build tooling
- **CSS3** - Styling with modern features (gradients, animations, flexbox)

## 🧪 Testing

The project includes test cases for:
- Component rendering
- Pattern validation
- Winning animation
- Game logic

Run tests with:
```bash
npm test
```

## 📝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Add tests** for new features
5. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Areas for Contribution:

- Additional difficulty levels
- New game modes (timer, daily challenges)
- Improved animations
- Accessibility improvements
- Performance optimizations
- Bug fixes
- Documentation improvements

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by classic Sudoku puzzles
- Built with love for the Sudoku community
- Special thanks to all contributors

## 📞 Contact

For questions, suggestions, or issues, please open an issue on GitHub.

---

**Enjoy playing Sudoku! 🎉**
