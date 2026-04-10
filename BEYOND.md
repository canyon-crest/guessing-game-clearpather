# Above and Beyond Features

## Overview
This document describes the creative features added to the Number Guessing Game beyond the 12 autograded requirements.

---

## 1. **Screen Shake Effect on Wrong Guesses**

### What It Does
When a player makes a wrong guess on Medium (10) or Hard (100) difficulty, the entire screen shakes. The intensity of the shake increases with more consecutive wrong guesses, creating a more immersive and challenging experience.

### Where It Is
- **JavaScript Function**: `shake(intensity)` (line 167-172 in script.js)
- **JavaScript Logic**: Called in `makeGuess()` function (lines 102 and 112)
- **CSS Animation**: `@keyframes shake` (lines 23-35 in style.css)
- **Global Variable**: `wrongGuesses` (line 7 in script.js)

### How It Works
1. Tracks the number of wrong guesses per round with `wrongGuesses` variable
2. Resets to 0 each time a new game starts via `play()`
3. When a guess is wrong AND difficulty is not Easy:
   - Increments `wrongGuesses`
   - Calls `shake(wrongGuesses)` function
4. The shake function adds the `.shake` CSS class to `<body>`
5. CSS animation moves the screen left and right rapidly for 500ms
6. After animation completes, the class is removed

---

## 2. **Modern Dark Theme Styling**

### What It Does
Complete visual redesign of the game with a modern, professional dark theme featuring neon cyan accents, smooth animations, and responsive design.

### Where It Is
- **CSS File**: `style.css` (entire file, 250+ lines)

### Features Include
- **Color Scheme**: Dark navy/blue background with cyan (#0ff) neon accents
- **Gradient Background**: Linear gradient from #1a1a2e to #16213e
- **Button Styling**: Gradient buttons with glow effects on hover
  - Play button: Cyan/teal gradient
  - Guess button: Green gradient
  - Give Up button: Red/pink gradient
- **Input Focus**: Cyan border with glowing shadow effect
- **Hover Effects**: All interactive elements have smooth transitions and lift animations
- **Typography**: Professional font stack with proper spacing and letter-spacing
- **Accessibility**: High contrast colors for readability

---

## 3. **Sound Effects on Game Events** (Bonus)

### What It Does
Plays audio feedback when significant game events occur:
- Sad trombone sound when player gives up
- Wrong answer buzzer when player makes wrong guesses

### Where It Is
- **HTML**: Audio elements in index.html
- **JavaScript**: 
  - `giveUp()` function calls `disappointmentSound.play()` (line 160)
  - `makeGuess()` function calls `screamSound.play()` (lines 104, 114)

---

## Acknowledgments

This project was developed with assistance from **Claude AI** (Anthropic), which provided:
- Step-by-step guidance on implementing JavaScript features
- Debugging help for syntax errors and logic issues
- CSS styling recommendations and design principles
- Code structure and organization best practices
- Troubleshooting support throughout development

Claude was used as a learning reference tool to understand requirements, debug issues, and enhance the game with creative features beyond the core requirements.