
<link type="text/css" rel="stylesheet" href="../md.css">

# Dynamics


### Inertia and moments
In static equilibrium, relationship between end-effector force $F$ and Joint torque $\tau$:
$$
\tau = J^TF
$$

> [Physics prequisite](http://hyperphysics.phy-astr.gsu.edu/hbase/mi.html)

force to torque:
$$
\tau = r \times F = rF\sin\theta
$$

[friction torque(viscous)](https://zh.wikipedia.org/wiki/%E9%98%BB%E5%B0%BC):
$$
\tau = -k\dot{\theta}
$$

>弹性力（k 为弹簧的劲度系数，x 为振子偏离平衡位置的位移）：
>$$
F = -kx
>$$
>阻尼力（c 为阻尼系数，v 为振子速度）：
>$$
F = -cv
$$

Small angle approximations:
$$\sin\theta \approx \theta, \tan\theta \approx \theta, \cos\theta \approx 1-\frac{\theta^2}{2}$$

![Linear Motion & Rotational Motion](images/ar_motion_compare.png)

![Common Moments of Inertia](images/ar_common_moments_inertia.png)

> **Q**: For arbitrary angular accelaration vector, its linear combination of rotations along axis: ![](images/ar_solid_cylinder.png =50%x)
>
> **A**:
> $$
\tau =
\begin{bmatrix}
\tau_x \\ \tau_y \\ \tau_z \\
\end{bmatrix} =
\underbrace{\begin{bmatrix}
\frac{1}{4}mr^2 +\frac{1}{12}mh^2 & 0 & 0\\ 0 & \frac{1}{4}mr^2 +\frac{1}{12}mh^2 & 0 \\ 0 & 0 & \frac{1}{2}mr^2 \\
\end{bmatrix}}_{\text{Inertia Tensor}}
\begin{bmatrix}
\ddot{\theta_x} \\ \ddot{\theta_y} \\ \ddot{\theta_z} \\
\end{bmatrix} = I\dot{\omega}
> $$
> Diagonal terms called _moments of inertia_. Off diagonals called prodcts of inertia, which are all **ZERO**s when coordinate frame is aligned with principle axes.

### Map from joint space to task space
torque:
$$
\tau = J^TF \rightarrow F^TJJ^TF=1
$$
velocity:
$$
\dot{q} = J^+\dot{x} \rightarrow \dot{x}^T(JJ^T)^{-1}\dot{x}=1
$$
The principle axes of 2 ellipsoids have same directions but _inverse_ magnitude.
### Forward dynamics
(Equations of motion) When forces do not cancel out and the equations of how robot will accelarate at given time.