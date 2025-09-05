# Representing and Manipulating Deformable Objects @ ICRA2022
> [Youtube](https://www.youtube.com/watch?v=Ir0hUawBWrQ)


## Introductions
Like breaking & making contacts problem, Deformable obj are very common in everyday life and in industry. we as human don't think much when dealing with them but they are quite difficult problems for robots.
we say  Deformable Objects Representing and Manipulating, but it is actually a large area of problems and often task specific.
Have to deal with complex geometry, $\infin$ states, complex contacts/ frictions/ forces.

<!-- ![](images/bg1.png) -->

The state of the deformable objects is **continuous infinite dimensional** and **governed by complex dynamics**. The full system is partially observable so we can't measure the full state from the real world but can only access the **controls** and **observaitons**.




## CHALLENGES
* Representation and state estimation
  * high/$\infin$ dimension for dynamics and control
  * Goal independent rep for all?
  * no standard/benchmarks to evaluate, what is good
  * environment feedback
* Simulations & Sim2Real Gap:
  * Exist Different sim. "Looks real" from vision people, e.g. toufu breaking
  * No unified parameters/limitation desc, difficult to adjust to task,
  * tradeoff for time/efficiency & precision
  * Differentiable
  <!-- * doufu -->
  <!-- * Simulation and modeling
  * Transfer from simulation to reality -->
* Learning from data-driven methods (RL) VS (expert) demonstrations
  * sim / real
  * Reset ( evaluate )
* Perception
  <!-- *  : state tracking, parameter identification, property detection (e.g. landmarks for garments) and classification, etc. -->
* Control, visual servoing and planning
  * underactuated system, use air/gravity
* Task specific
  * DLO : Deformable linear objects
  * Elasto-Plastic / visco-elastic <!--( deformation & applied force rate (in/)dependent) -->
  * robot surgery, garment folding, agricultural
  * Multi-arm manipulation
  * Specialised tools, e.g. grippers, and sensors
* Make use of modern gpu resources


## Interesting Approaches
