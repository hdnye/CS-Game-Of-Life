# CSUnit1Build--GameOfLIfe 

# What is the project? 
    Recreate Classic 2D CS Game 

# Conway's Game of LIfe Rules
    BS3/SGS23

    Rules:
    - Overpopulation: Any live cell surrounded by 3 ore more living cells dies
    - Static: A live cell lives on to the next generation
    - Underpopultion: A live cell with fewer than 2 live neighbors dies
    - Reproduction: Any dead cell with exactly 3 live neighbors becomes a live cell

    Instructions:
    - Initialize an empty universe
    - Fill the universe with the seed 
    - Calculate if the current cell survives into the next generation, based on its neighbors
    - Repeat this function over all the cells in the universe
    - Repeat previous 2 steps for each generation     

# What problem does it solve?
   A way to visualize pattern evolution utlizing a simple set of behavioural rules for each cell. In the absence of 
   a predetermined outcome, it shows emergence and self-organization are possible w/o prior design or programming 

# Exceptional difficultiies and solutions, if any

# TODO list/wishlist. What do you want to add to it if you have more time?

# Objectives  

   # Explain what cellular automata are & describe how they are useful in the real world
   Cellular automata are a model of computation by which a cell is represented by a finite number of states, depending also on the state of its neighbors,
   as represented by moving figures on a grid of any finite number of dimensions. The cells of the grid are updated simulateously and are all subject to the same rules. 

   # Correctly analyze the ‘Turing Completeness’ of Conway’s “Game of Life”

   # Implement a visualization of Conway’s “Game of Life” using technologies related to their specific track.

   # Utilize "double buffering" to implement the game