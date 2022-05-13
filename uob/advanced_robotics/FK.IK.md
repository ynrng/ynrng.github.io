
<link type="text/css" rel="stylesheet" href="../md.css">

# FK/IK


## Basics
* Degree of Freedom (DoF)
* Under-actuation
* Redundancy
* Workspace

**Typical robot joints**
2 main type: Revolute & Prismatic

![](images/ar_joints.png)

**Robot configuration** ( position of all points of the robot)
Only focus on Rigidbody

End-effector configuration parameters:
$X=\begin{bmatrix}
X_P\\ X_R
\end{bmatrix}$

$X_P$: Position representations (3 DOF = 3 parameters)
* _Cartesian_ $<x, y, z>$
* Cylindrical $<\rho, \theta, z>$
* Spherical $<r , \theta, \phi>$

$X_R$: Rotation Reps (3 DOF = 9 params - 6 constraints) $\leftarrow$ redundent expression

$$
R =
\begin{bmatrix}
r_{11} & r_{12} & r_{13} \\
r_{21} & r_{22} & r_{23} \\
r_{31} & r_{32} & r_{33} \\
\end{bmatrix}
=
\begin{bmatrix}
r_{1} & r_{2} & r_{3} \\
\end{bmatrix}
$$
*constraints (6)*
$
|r_1|=|r_2|=|r_3|=1
$

$
r_1\cdot r_2 = r_2\cdot r_3 = r_3\cdot r_1 = 0
$

3 angular representations:
* Euler Angles (eg: `Z-Y-X`)



**Degree of Freedon ( DOF )**

**homogeneous transformation**

$~^A P$ is point `P` represented in coordinates `A`

$~^A_B T$ transform matrix from coordinates `B` to `A`

$
~^A P = ~^A_B T ~^B P = ~^A_B T ~^B_C T ~^C P = ~^A_C T ~^C P
$
$
\Rightarrow \red{~^A_C T = ~^A_B T ~^B_C T} =
\begin{bmatrix}
~^A_B R~^B_C R &  ~^A_B R ~^B P_{origin C} + ~^A P_{origin B} \\
0^T &  1\\
\end{bmatrix}
$

### Elementary Rotations
$$
R_z(\alpha)=
\begin{bmatrix}
\cos \alpha & \red- \sin \alpha & 0\\
\sin \alpha & \cos \alpha & 0\\
0 & 0 & 1\\
\end{bmatrix}
$$

$$
R_y(\beta)=
\begin{bmatrix}
\cos \beta & 0& \sin \beta \\
0  & 1& 0\\
\red- \sin \beta & 0& \cos \beta \\
\end{bmatrix}
$$

$$
R_x(\gamma)=
\begin{bmatrix}
1 & 0& 0\\
0 &\cos \gamma &  \red- \sin \gamma \\
0& \sin \gamma & \cos \gamma \\
\end{bmatrix}
$$

Rotate base on **current frame** => Post multiplication ( Right )

Rotate base on **fixed frame** => Pre multiplication ( Left )

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


### Inverse
$
p^b=o^b_e+R_e^bp^e
$


### DH parameters (Denavit-Hartenberg)
* z- prismatic translate along z; revolute rotate along z;
* x- parallel to common normal of sequential z- ( $z^{i-1}, z^i$)
* y- right hand coordinates
* di: distance between Oi-1 and Oi’ along zi-1 <!-- (For prismatic joints) -->
* θi: angle between xi-1 and xi about zi-1 (For revolute joints, θi defines the motioni defines the motion)
* **ai**: distance between Oi and Oi’
* αi: angle between zi-1 and zi

(to make operation easier, try to define base frame overlap with 1st frame, & overlap intermediate frame)

1. define z-
1. origin ( intersection of common normal of $z^i, z^{i-1}$)
1. $x^i$ is defined alone common normal, with direction of right hand from $z^{i-1}, z^i$
1. y force right hand corrdinates
1. $\alpha^i$ is right hand from $z^{i-1}, z^i$



### Homogeneous Transformation Matrix
Given the four D-H parameters for joint i: $a_i, d_i, \theta_i, \alpha_i$, we can
compute the homogeneous transformation matrix from joint i-1 to joint i:

$
A^{i-1}_i(q_i)=A^{i-1}_{i'}A^{i'}_{i}=
\begin{bmatrix}
\pink{\cos\theta_i} & \pink{-\sin\theta_i}\cos\alpha_i & \sin\theta_i\sin\alpha_i & \pink{a_i\cos\theta_i} \\
\pink{\sin\theta_i} & \pink{\cos\theta_i}\cos\alpha_i & -\cos\theta_i\sin\alpha_i & \pink{a_i\sin\theta_i} \\
0 & \sin\alpha_i & \cos\alpha_i & d_i \\
0 & 0 & 0 & 1\\
\end{bmatrix}
$

<!-- For revolute planar arm, reduces to (pink colored), where $a_i$ is constant:
$
A^{i-1}_i(\theta_i)=
\begin{bmatrix}
\cos\theta_i & -\sin\theta_i  & 0 & a_i\cos\theta_i \\
\sin\theta_i & \cos\theta_i  & 0 & a_i\sin\theta_i \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1\\
\end{bmatrix}
$ -->

For prismatic planar,
$
A^{i-1}_i(d_i)=
\begin{bmatrix}
1 & 0  & 0 & a_i \\
0 & \cos\alpha_i  & -\sin\alpha_i & 0 \\
0 & \sin\alpha_i & \cos\alpha_i & d_i \\
0 & 0 & 0 & 1\\
\end{bmatrix}
$


By computing each transformation from joint to joint, and
_post_ multiplying them all together, we have the complete transformation
from the base frame to the end-effector frame

$
T^0_n(q)=A^0_1(q_1)A^1_2(q_2)...A^{n-1}_n(q_n) \\\\
\Leftrightarrow X_e=k(q)=\begin{bmatrix}p_e & \phi_e\end{bmatrix}^T
$
$
q=\begin{bmatrix}q_1 & ... & q_n\end{bmatrix}^T
$
where $q_i=\theta_i$ for revolute joint, $q_i=d_i$ for  prismatic joint


> **Q**: Given an arm,
> **A**:
>1. define frame
>1. define dh parameter
>1. computer post multiplication


### Jaccobian -- w3
$
\frac{dx_e}{dt} =
\begin{bmatrix}
\frac{\partial k_1}{\partial q_1} & \frac{\partial k_1}{\partial q_2} & \frac{\partial k_1}{\partial q_3} \\\\
\frac{\partial k_2}{\partial q_1} & \frac{\partial k_2}{\partial q_2} & \frac{\partial k_3}{\partial q_3} \\
\end{bmatrix}
\begin{bmatrix}
\frac{dq_1}{dt} \\\\
\frac{dq_2}{dt} \\\\
\frac{dq_3}{dt}
\end{bmatrix}
$

$
\Leftrightarrow
\dot{X}_e=\pink{\frac{\partial k(q)}{\partial q}}\dot{q} = J(q)\dot{q}
$

> **Q**: Calculate the J of the arm.
>
> ![](images/ar_eg_dh.png =50%x)
>
>**A**:
>$
X_e=\begin{bmatrix}p_x & p_y & \phi\end{bmatrix}^T=k(q)=
\begin{bmatrix}
a_1c_1+a_2c_{12}+a_3c_{123} \\
a_1s_1+a_2s_{12}+a_3s_{123} \\
\theta_1+\theta_2+\theta_3
\end{bmatrix}
$
>$J(q)=\frac{\partial k(q)}{\partial q} =
\begin{bmatrix}
-a_1s_1-a_2s_{12}-a_3s_{123} & -a_2s_{12}-a_3s_{123} & -a_3s_{123} \\
a_1c_1+a_2c_{12}+a_3c_{123} & a_2c_{12}+a_3c_{123} & a_3c_{123} \\
\theta_1 & \theta_2 & \theta_3
\end{bmatrix}
$


**Derive $J$**


$
p^b=o^b_e+R_e^bp^e
$
taking derivative on both side $\frac{d}{dt}p^b\Rightarrow$
$
\dot{p}^b=\overbrace{\dot{o}^b_e}^{\text{change in displacement between frames}}+\underbrace{\pink{\dot{R}^b_ep^e}}_{\text{velocity of rotation}}+\overbrace{R^b_e\dot{p}^e}^{\text{velocity w.r.t. end-eff frame }} \blue{\leftarrow\text{product rule}}
\\
\text{where }  \dot{R}^b_ep^e = \omega \times p^e_b = \omega \times R^b_ep^e
$

$
\omega_i=\omega_{i-1}+\pink{\omega_{i-1,i}} \blue{\leftarrow \text{relative rotation between 2 frames}}
$



<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
<script type="text/x-mathjax-config">
    MathJax.Hub.Config({ tex2jax: {inlineMath: [['$', '$']]}, messageStyle: "none" });
</script>
