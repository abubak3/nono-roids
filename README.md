# nono-roids

CSE 264 Final Project
Due May 7 2024

Aspen Bubak and Henrik Hovstadius

## Build
  
  1. Download zip file and unzip
  2. Install node
  3. Run node app.js

## Instructions to play

  1. Open browser to localhost:3000
  2. Instructions will appear on homescreen
  3. Select a Difficult from the top menu bar
  4. Solve the Nonogram and don't let the asteroids hit the grid
  5. To return to Home, either win/lose or click on the Nono-Roid text in the top left corner

## Ideas

Basic idea - Nonogram game in center. Asteroids coming at it need to be clicked to be destroyed. 3 lives. Easy Medium and Difficult - harder nonograms, more asteroids.

## To Do

- Home Page and Game play Page?
  - Home
    - Top Menu Bar to select Difficulty                       - DONE
    - Logo in the middle? Pretty rotating planet maybe?       - DONE
    - intructions at bottom                                   -NEED TO FILL IN
  - Game Page
    - Canvas on whole page. spot in center for the grid? (Like the Fruit Smash Game)- DONE
    - Game name in top left corner                                                      - WORKS - links back to home
    - lives in top right corner                                                 - UPDATES WHEN ASTEROID HITS GRID
    - at bottom of page select the X or Check for the nonogram                  - WORKS 
    - asteroid objects flying on page                                           - WORKS
- Preload
  - Hard Coded Nonogram Grids (maybe like 10 of each level?)                      - DONE
  - Upload images for asteroids and hearts                                        - UPLOADED ASTEROID PICS - NOT DOING HEARTS?
- Win / Lose
  - Win when nonogram is finished                                           - WORKS
  - Lose when lives = 0 (lose a life everytime an asteroid hits the board)        - WORKS
  - Clear page and have animations? confetti or red screen of death                   - HAVE A COUNTDOWN INSTEAD
  - Send back to home page                                                              - WORKS
- Implementing Things
  - Nonogram Part
    - Load in grid                                  - WORKS
    - Numbers for the clues                         - WORKS
    - Hover over cells                              - DIDNT IMPLEMENT?
    - select mode (x or check)                      - WORKS
    - win function                                  - WORKS
  - Asteroid Part
    - Know where the nonogram is                    - WORKS
    - Create asteroid objects                       - WORKS
    - Launch from edges of screen                   - WORKS
    - Know when clicked on                          - WORKS
    - Know when hits the nonogram                   - WORKS
    - Update Lives                                  - WORKS
