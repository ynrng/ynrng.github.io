
<link type="text/css" rel="stylesheet" href="../md.css">

# [Home](../../index.md) > [Advanced Robotics](README.md)

- [Math/Physics](Math.Physics.md)
- [FK/IK](FK.IK.md)
- [Dynamics](Dynamics.md)
- [Controls](Controls.md)
- Motion Planning
<!-- - [Motion Planning](MP.md) -->

## Rotation

> **Q**:  What's the properties of rotation matrix?

**A**:
- A rotation matrix will always be a square and orthogonal matrix.
  - Column vectors are mutually orthogonal (orthonormal frame)
  - Column vectors have unit norm
- the transpose will be equal to the inverse of the matrix $R^T=R^{-1}$.
- The determinant of a rotation matrix will always be equal to 1. $det(R)=1$.
- Right-handed coordinate system
  - for clockwise rotation, a negative angle is used.
- Multiplication of rotation matrices will result in a rotation matrix.


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


## Jacobian/FK/IK

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
$\omega_e = T(\phi_e)\dot{\phi_e}$
- For ZYZ:
$$
T = \begin{bmatrix}
  0& -s_\phi & c_\phi s_\theta \\
  0& c_\phi & s_\phi s_\theta \\
  1& 0& c_\theta\\
\end{bmatrix}
$$

$det(T) =  -s^2_\phi s_\theta - c^2_\phi s_\theta=-s_\theta=0$.
There exist angular velocities which cannot be expressed by means of $\dot \phi_e$
Reach _Representation sigularity_ when $\theta=0,\pi$

- For ZYX (yaw pitch roll):
$$
T=\begin{bmatrix}
  0& -s_\phi & c_\phi c_\theta \\
  0& c_\phi & s_\phi c_\theta \\
  1& 0& -s_\theta\\
\end{bmatrix}
$$

$det(T) =  -s^2_\phi c_\theta - c^2_\phi c_\theta=-c_\theta=0$
Reach _Representation sigularity_ when $\theta=\pm\pi/2$

## Dynamics
> **Q**: How to derive Lagrange equation for robot?

**A**:
1. Compute position **$p_i$**, linear velocity **$v_i=\frac{d p_i}{dt}$** and acceleration **$a_i=\frac{d v_i}{dt}$**, angular velocity $\omega_i$, acceleration $\alpha_i=\frac{d \omega_i}{dt}$ vector of _CoM_ each joint.
2. Write / assume moment of Inertia **$Ii$**, mass **$m_i$** of each link;
Make assumptions that coordinate frame is aligned with principle axes so that _Off diagonals (prodcts of inertia) are all ZEROs_. Diagonal terms (moments of inertia) are inertia about each axis. (SEE [Dynamics Q1](Dynamics.md#Q1).)
1. Calculate kinetic $\frac{1}{2}m_iv_i^Tv_i \pink+ \frac{1}{2}w_i^TI_iw_i$ _AND_ potential energy **$m_igh_i$** for each link.
1. Derive the Lagrange equation $L = KE-PE$.
2. _Derive equation_ of motion with dynamics $\frac{d}{dt} (\frac{\partial{L}}{\partial{\dot{\theta}}}) -\frac{\partial{L}}{\partial{\theta}} = F_{ext} = \sum\tau$ and get $M,B,C,G$. (SEE [Inverse Dynamics](Dynamics.md#inverse-dynamics))


## Control
> **Q**: Compare different control


| | Equation | When |
|---|---|---|
| Feedforward | $M(q_d)\ddot{q}_d + C(q_d,\dot{q}_d)+G(q_d) = \tau$|  Ideal case.|
| Feedback | $\tau = \underbrace{k_p(\theta_d-\theta)}_{\text{spring}}\underbrace{-k_v\dot{\theta}}_\text{damper}$ | _Inverse dynamics_ control. Minimise steady-state error. |
| PID | $\tau = \underbrace{k_p(\theta_d-\theta)}_{\text{P:Proportional }}\underbrace{-k_v\dot{\theta}}_\text{ D:Derivative}+\underbrace{\red{k_i\int(\theta_d-\theta)dt}}_\text{I:Integral}$ | _NOT_ safe for robot. Integral. |
| Gravity compensation |$\tau = \underbrace{k_p(\theta_d-\theta)}_{\text{P:Proportional }}\underbrace{-k_v\dot{\theta}}_\text{ D:Derivative}+\underbrace{rmg\theta}_\text{gravity compensation}$| Model based. Need to know _G_|
| Linearlisation |$\tau = M(q)\red{(\ddot q_d+K_P(q_d-q)+K_D(\dot q_d-\dot q))} + C(q,\dot{q})+G(q)$| tracking complete trajectory. Error guaranteed to 0|
| Task space control |$\tau = J^TF+(I-J^T\bar{J}^T)\tau_0$|Desired motion in task space ( end effector ). Null space projection for secondary task.|
| Impedance control | $M(q_d)\ddot{q}_d + C(q_d,\dot{q}_d)+G(q_d) = \tau \red\pm J^T_CF_{ext}$ |External forces applied by(+)/to(-) robot. Can be at any joint.|
| Force control |$\tau = J^TF_d+ \~g(q)$ | |
| Hybrid Force-motion control |$\tau = J_b^TF_b$| seperate control of force and motion. Force in one direction and motion in another. e.g. open a door(door's moving). Task space controller with constraints. Projection matrix $P(\theta)$ and $1-P$ project motion and force to subspace.|

## Motion planning
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
