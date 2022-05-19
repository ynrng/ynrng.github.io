
<link type="text/css" rel="stylesheet" href="../md.css">

# Advanced Robotics

- [FK/IK](FK.IK.md)
- [Dynamics](Dynamics.md)
- [Controls](Controls.md)
- Motion Planning
<!-- - [Motion Planning](MP.md) -->

### Rotation

> **Q**:  What's the properties of rotation matrix?

 **A**:
 - A rotation matrix will always be a square and orthogonal matrix
 - the transpose will be equal to the inverse of the matrix.
 - The determinant of a rotation matrix will always be equal to 1.
 - Multiplication of rotation matrices will result in a rotation matrix.
 - Furthermore, for clockwise rotation, a negative angle is used.


> **Q**: how to determine a matrix is a rotation matrix.
given
$
R^A_B =
\begin{bmatrix}
\cos \theta & 0& \sin \theta \\
\sin \phi \sin\theta & \cos\phi & -\sin\phi\cos\theta\\
-\cos\phi\sin\theta & \sin\phi & \cos\phi\cos\theta \\
\end{bmatrix}
$

**A**: calculate the $det(R^A_B)=1$ and prove $R^{-1} = R^T  \Leftrightarrow RR^T=I$


### Jacobian/FK/IK

> **Q**: List one advantage and one disadvantage for using the Jacobian transpose ($J^T$) method, versus of the Jacobian Moore-Penrose pseudoinverse ($J^+$) when computing
inverse kinematics solutions.

**A**:

| | pros | cons | principles |
|---|---|---|---|
| $J^{-1}$  | most precise | not exist when J drops rank |
| $J^T$| <li>**Simple** computation (numerically robust) </li><li>No matrix inversions</li> | <li>Needs many iterations until convergence in certain configurations</li> <li>Unpredictable joint configurations</li><li>Non conservative </li>| Project difference vector Dx on those dimensions q which can reduce it the most  |
| $J^+=J^T(JJ^T)^{-1}$  | <li>Computationally **fast** (second order method) </li><li>pseudoinverse gives the best possible solution in the sense of least squares</li><li>the matrix ($I − J^+J$) performs a projection onto the **nullspace** of J, which can be exploited to achieve secondary goals</li> | <li>The pseudoinverse tends to have stability problems in the **neighborhoods** of singularities</li><li>worked very poorly whenever the target positions were out of reach</li> <li>Matrix inversion necessary (numerical problems) </li><li>Unpredictable joint configurations</li><li>Non conservative </li> | Shortest path in q-space  |
|  Damped least squares| pros | cons | principles |


> **Q**: Determine the relationship between angular velocities and time
derivatives of the Euler angles.

**A**:

- For ZYZ:
- For XYZ:

### Dynamics
> **Q**: Centre of Mass?

**A**:


### Motion planning
> **Q**: Comparisions between different methods?

**A**:

| | pros | cons | others |
|---|---|---|---|
| Potential Fields | Smooth, obstacle-free trajectory | in highly-cluttered environments, <li>Attraction and repulsion forces can balance;</li><li> The robot can get stuck</li> | |
| Voronoi Graphs | solve stuck | Paths are not smooth, requires post-processing | Focus on the free space |
| Regular Cell Decomposition | <li>The solution is obstacle-free;</li> <li>The result can be used for multiple starting positions;</li> | <li>The solution still requires post-processing(not smooth);</li> <li>Cell decomposition can prune valid solutions;</li> | wavefront propagation algorithm |
| Sampling Based Roadmaps |  <li>A single roadmap can be used for multiple problems(Multiple-query methods);</li><li> Single queries are very fast to compute; </li> | <li>This method could fail to find an existing solution;</li><li> Dynamic environments require new roadmaps or costly “maintenance work”;</li> | |
| Rapidly-exploring Random Trees (RRTs) | <li>Generally fast;</li>  <li> Probabilistically complete (but convergence not guaranteed);</li> <li>Solutions respect differential constraints; </li> | <li>Non-optimal;</li><li>Generated trajectories may have discontinuities;</li><li> Difficult to obtain high end-pose accuracy;</li><li> single-query method, in non-holonomic planning (in general, under differential constraints), connecting configurations  and checking for collisions is very time-consuming;</li> | configuration space is sampled randomly |
| Lattice Based Methods | <li>Time-consuming computation off-line; </li><li> Leverage decades of AI search algorithms;</li><li> Deterministic results; </li><li>Can generate optimal solutions;</li>  | <li>Lattices can be extremely large;</li><li> Discretized sampling for (q_I , q_G );          </li> | |
