# IR

## Bayes Filter BF

Prediction step:
$
\overline{bel}(x_t) = \int \underbrace{ p(x_t | u_t, x_{t-1} )}_{\text{motion model}} bel(x_{t-1})dx_{t-1}
$

Correction step:
$
bel(x_t) = \eta \underbrace{ p(z_t | x_t)}_{\text{observation model}} \overline{bel}(x_t)
$

### Kalman Filter

- Everything is Gaussian:
$
p(x) = det ( 2 \pi \Sigma )^{-1/2} exp(-\frac{1}{2}(x-\mu)^T\Sigma^{-1}(x-\mu))
$
- Linear transition & observation model:
$
f(x)=Ax+b
$
- **Optimal** solution for linear models + G distributions (maybe least square)


$
x_t = A_tx_{t-1}+B_tu_t+\epsilon_t
$

$
z_t=C_tx_t+\delta_t
$

> $A_t$: (n$\times$n). How state evolve without controls or noises. \
> $B_t$: (n$\times$l). How control $u_t$ changes the state. Map from control command to state space. \
> $C_t$: (k$\times$n). How to map from state to observation space. \
> Gaussian mean = 0. \
> $\epsilon_t$, $\delta_t$: Random variables of **independent and normally distributed** process and measurement noise with covariance $R_t$, $Q_t$.

Linear Obs model:

$
p(z_t|x_t) = det ( 2 \pi Q_t )^{-1/2} exp(-\frac{1}{2}(z_t-C_tx_t)^TQ_t^{-1}(z_t-C_tx_t))
$


---

#### ***Algorithm KF***

**Kalman_filter**($\mu_{t-1}$, $\Sigma_{t-1}$, $u_t$, $z_t$): \
\# prediction step \
$\overline{\mu}_t=A_t\mu_{t-1}+B_tu_t$ \
$\overline{\Sigma}_t=A_t\Sigma_{t-1}A_t^T+R_t$ \
\# correction step \
$K_t = \overline{\Sigma}_tC_t^T(C_t\overline{\Sigma}_tC_t^T+Q_t)^{-1}$ \# Kalman gain \
$\mu_t=\overline{\mu}_t+K_t(z_t-C_t\overline{\mu}_t)$ \
$\Sigma_t=(I-K_tC_t)\overline{\Sigma}_t$ \
return $\mu_t, \Sigma_t$


---


### Extended KF
The linear model is hard to satisfy.

Linearisation: First Order Taylor expansion

---

#### ***Algorithm EKF***

A<-G, C<-H

**Extended_Kalman_filter**($\mu_{t-1}$, $\Sigma_{t-1}$, $u_t$, $z_t$): \
\# prediction step \
$\overline{\mu}_t=g(u_t, \mu_{t-1})$ \# g is *non-linear* motion model \
$\overline{\Sigma}_t=G_t\Sigma_{t-1}G_t^T+R_t$ \
\# correction step \
$K_t = \overline{\Sigma}_tH_t^T(H_t\overline{\Sigma}_tH_t^T+Q_t)^{-1}$ \# Kalman gain \
$\mu_t=\overline{\mu}_t+K_t(z_t-h(\overline{\mu}_t))$  \# h is *non-linear* obs model \
$\Sigma_t=(I-K_tH_t)\overline{\Sigma}_t$ \
return $\mu_t, \Sigma_t$


---
