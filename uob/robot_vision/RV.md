---
layout: page
title: Robot Vision
---

<!-- # [Home](../../index.md) > [Robot Vision](README.md) > RV -->

## Pinhole Camera - W7.1

### Acquiring Image

**CMOS | CCD sensor** - a digital camera sensor composed of a grid of _photodiodes_. One _photodiode_ can capture one `RGB` color, therefore, specific pattern of diodes is used where a subgrid of diodes provides information about color (most popular - **Bayer filter**).

**Bayer fillter** - an `RGB` mask put on top of a digital sensor having twice as many green cells as blue/red to accomodate human eye. A cell represents a color a diode can capture. For actual pixel color, surrounding cells are also involved.

> Since depth information is lost during projection, there is ambiguity in object sizes due to perspective

### Pinhole Camera

**Pinhole camera** - abstract camera model: a box with a hole which assumes only one light ray can fit through it. This creates an inverted image on the _image plane_ which is used to create a virtual image at the same distance from the hole on the _virtual plane_.

![Pinhole Camera](https://www.researchgate.net/profile/Chandra-Sekhar-Gatla/publication/41322677/figure/fig1/AS:648954270216192@1531734163239/A-pinhole-camera-projecting-an-object-onto-the-image-plane.png)

Given a true point $=\begin{bmatrix}x & y & z\end{bmatrix}^{\top}$ and a projected point $P'=\begin{bmatrix}x' & y' & z'\end{bmatrix}^{\top}$ (where $z'=f'$ and focal distance is usually given) and that $P'O=\lambda PO$ (beacsue $PO$ and $P'O$ are collinear ($O$ - hole), by _similar triangles_:

$$\begin{bmatrix}x' & y' & z'\end{bmatrix}^{\top}\to\begin{bmatrix}f'(x/z) & f'(y/z) & f'\end{bmatrix}^{\top}$$

Such **weak-perspective projection** is used when scene depth is small because _magnification_ $m$ is assumed to be constant, e.g.,  $x'=-m x$, $y'=-m y$. **Parallel projection** where points are parallel along $z$ can fix this but are unrealistic.

> **Pinhole cameras** are dark to allow only a small amount of rays hit the screen (to make the image sharp). Proper size Pinhole results in _dark but sharp_ image.
>
>  **Lenses** are used instead to 1. gather light 2.keep the picture in sharp focus.


## Camera Geometry

### Camera Calibration

Projection of a `3D` coordinate system is _extrinsic_ (`3D` world $\to$ `3D` camera) and _intrinsic_ (`3D` camera $\to$ `2D` image). An acquired point in camera `3D` coordinates is projected to _image plane_, then to discretisized image. General camera has `11` projection parameters.

For _extrinsic_ projection real world coordinates are simply aligned with the camera's coordinates via translation and rotation:

$$\tilde{X}_{\text{cam}}=R(\tilde{X}-\tilde{C})$$

**Homogenous coordinates** - "projective space" coordinates (_Cartesian coordinates_ with an extra dimension) which preserve the scale of the original coordinates. E.g., scaling $\begin{bmatrix}x & y & 1\end{bmatrix}^{\top}$ by $w$ (which is usually distance from projector to screen) gives $\begin{bmatrix}wx & wy & w\end{bmatrix}^{\top}$.

> In **_normalized_ camera coordinate system** origin is at the center of the image plane. In the **image coordinate system** origin is at the corner.

**Calibration matrix** $K$ - a matrix used to compute projection matrix $P_0$ for a `3D` camera coordinate to discrete pixel

$$\begin{pmatrix}x' \\ y' \\ z'\end{pmatrix}=\underbrace{\begin{bmatrix}\alpha_x & s & x_0 \\ 0 & \alpha_y & y_0 \\ 0 & 0 & 1\end{bmatrix}\begin{bmatrix}1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0\end{bmatrix}}_{P_0=K \cdot [I|0]}\begin{pmatrix}x \\ y \\ z \\ 1\end{pmatrix}$$

Where:
* _$\alpha_x$_ and _$\alpha_y$_ - focal length $f$ (which acts like $z$ (i.e., like extra dimension $w$) to divide $x$ and $y$) multiplied by discretization constant $m_x$ or $m_y$ (which is the number of pixels per sensor dimension unit)
* _$x_0$_ and _$y_0$_ - offsets to shift the camera origin to the corner (results in only positive values)
* _$s$_ - the sensor skewedness: it is usually not a perfect rectangle

> Lens adds nonlinearity for which symmetric radial expansion is used (for every point from the origin the radius changes but the angle remains) to un-distort. Along with shear, this transformation is captured in _$s$_ (see above).

For a general projection matrix, we can obtain a translation vector $\mathbf{t}=-R\tilde{C}$ and write a more general form (assuming _homogenousity_):

$$X'=K[R|\mathbf{t}]X=PX$$

<div style="text-align: justify;">

If `3D` coordinates of a real point and `2D` coordinates of a projected point are known, then, given a pattern of such points, $P$ can be computed by putting a calibration object in front of camera and determining correspondences between image and world coordinates, i.e., "`3D`$\to$`2D`" mapping is solved, e.g., via _Direct Linear Transformation_ (_DLT_) (see [this video](https://www.youtube.com/watch?v=3NcQbZu6xt8)) or _reprojection error_ optimization. If positions/orientations are not known, **multiplane camera calibration** is performed where only many images of a single patterned plane are needed.

</div>

### Vanishing Points

Given a point $A$ and its direction $D$ towards a _vanishing point_, any further point is found by $X(\lambda)=A+\lambda D$. If that point is very far, $\lambda=\infty$, $A$ becomes insignificant and projection results in _vanishing point_ itself: $\mathbf{v}=\begin{bmatrix}f x_D/z_D & f y_D / z_D\end{bmatrix}^{\top}$.

> **Horizon** - connected _vanishing points_ of a plane. Each set of parallel lines correspond to a different _vanishing point_.

## Feature-based Alignment

### 2D Transformation and Affine Fit

**Alignment** - fitting transformation parameters according to a set of matching feature pairs in original image and transformed image. Several matches are required because the transformation may be noisy. Also outliers should be considered (**RANSAC**)

**Parametric (global) wrapping** - transformation which affects all pixels the same (e.g., translation, rotation, affine). **Homogenous** coordinates are used again to accomodate transformation: $\begin{bmatrix}x' & y' & 1\end{bmatrix}^{\top}=T\begin{bmatrix}x & y & 1\end{bmatrix}^{\top}$. Some examples of $T$:

$$\underbrace{\begin{bmatrix}1 & 0 & t_x \\ 0 & 1 & t_y \\ 0 & 0 & 1\end{bmatrix}}_{\text{translation}};\ \text{ }\ \underbrace{\begin{bmatrix}s_x & 0 & 0 \\ 0 & s_y & 0 \\ 0 & 0 & 1\end{bmatrix}}_{\text{scaling}};\ \text{ }\ \underbrace{\begin{bmatrix}\cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1\end{bmatrix}}_{\text{rotation}};\ \text{ }\ \underbrace{\begin{bmatrix}1 & sh_x & 0 \\ sh_y & 1 & 0 \\ 0 & 0 & 1\end{bmatrix}}_{\text{shearing}}$$

**Affine transformation** - combination of linear transformation and translation (parallel lines remain parallel). It is a generic matrix involving `6` parameters.

### Random Sample Consensus (RANSAC)

**RANSAC** - an iterative method for estimating a mathematical model from a data set that contains outliers

The most likely model is computed as follows:
1. Randomly choose a group of points from a data set and use them to compute transformation
2. Set the maximum inliers error (margin) $\varepsilon_i=f(x_i, \mathbf{p}) - y_i$ and find all inliers in the transformation
3. Repeat from step `1` until the transformation with the most inliers is found
4. Refit the model using all inliers

In the case of **alignment** a smallest group of correspondences is chosen from which the transformation parameters can be estimated. The number of inliers is how many correspondences in total agree with the model.

> **RANSAC** is simple and general, applicable to a lot of problems but there are a lot of parameters to tune and it doesn't work well for low inlier ratios (also depends on initialization).

### Homography

**Homography** - projection from plane to plane: $w\mathbf{x}'=H\mathbf{x}$ (used in stitching, augmented reality etc). Projection matrix $H$ can be estimated by applying _DLT_. It is a mapping between `2` projective planes with the same center of projection.

> **Stitching** - to stitch together images into panorama (mosaic), the transformation between `2` images is calculated, then they are overlapped and blended. This is repeated for multiple images. In general, images are reprojected onto common plane.

For a single `2D` point $\begin{bmatrix}wx_i' & wy_i' & w\end{bmatrix}^{\top}=H\begin{bmatrix}x_i & y_i & 1\end{bmatrix}^{\top}$, where $H\in\mathbb{R}^{3\times3}$, every element in the projected point can be weritten as combination of every row element of $H$ and the whole original point, e.g., $wx_i'=H_0\mathbf{x}_i$. With some structuring, a $2 \times 9$ matrix can be created containing values (along with negatives, `1`s and `0`s) of orignial and projected coordinates and a $9 \times 1$ matrix containing only entries from $H$. Multiplying them would give $2\times 1$ `0`s vector. More correspondences can be added which would expand the equation:

$$\underbrace{\begin{bmatrix}x_1 & y_1 & 1 & 0 & 0 & 0 & -x_1'x_1 & -x_1'y_1 & -x_1' \\ 0 & 0 & 0 & x_1 & y_1 & 1 & -y_1'x_1 & -y_1'y_1 & -y_1' \\ \vdots & \vdots & \vdots & \vdots & \vdots & \vdots &\vdots & \vdots & \vdots\\ x_N & y_N & 1 & 0 & 0 & 0 & -x_N'x_N & -x_N'y_N & -x_N' \\ 0 & 0 & 0 & x_N & y_N & 1 & -y_N'x_N & -y_N'y_N & -y_N' \\ \end{bmatrix}}_{A}\underbrace{\begin{bmatrix}h_{11} \\ h_{12} \\ h_{13} \\ h_{21} \\ h_{22} \\ h_{23} \\ h_{31} \\ h_{32} \\ h_{33}\end{bmatrix}}_{\mathbf{h}}=\underbrace{\begin{bmatrix}0 \\ 0 \\ \vdots \\ 0 \\ 0\end{bmatrix}}_{\mathbf{0}}$$

This can be formulated as _least squares_: $\min||A\mathbf{h}-\mathbf{0}||^2$ to which the solution is $\mathbf{h}$ is the eigenvector of $A^{\top}A$ with the smallest eigenvalue (assuming $||\mathbf{h}||^{2}=1$ so that values wouldn't be infinitely small).

> During forward wrapping (projection), pixels may be projected between discrete pixels in which case **splatting** - color distribution among neighboring pixels - is performed. For inverse wrapping, color from neighbors is interpolated.

## Local Features

### Local Feature Selection

**Local features** - identified points of interest, each described by a feature vector, which are used to match descriptors in a different view. Applications include image alignment, 3D reconstruction, motion tracking, object recognition etc.

Local feature properties:
* **Repeatability** - same feature in multiple images (despite geometric/photometric transformations). Corners are most informative
* **Saliency** - distinct descriptions for every feature
* **Compactness** - num features $\ll$ image pixels
* **Locality** - small area occupation

**Harris Corner Detector** - detects intensity $(I)$ change for a shift $[u, v]$ (weighted auto-correlation; $w(\cdot)$ - usually _Gaussian_ kernel):

$$E(u, v)=\sum_{x,y}\underbrace{w(x, y)}_{\text{weight fn}}[I(x+u,y+v) - I(x,y)]^2$$

For small shifts $E$ can be approximated (_Taylor Expansion_) as $E(u,v)\approx \begin{bmatrix}u & v\end{bmatrix}M\begin{bmatrix}u & v\end{bmatrix}^{\top}$, where $M\in\mathbb{R}^{2\times 2}$ - a weighted sum of matrices of image region derivatives (_covariance_ matrix), which can be expressed as a convolution with _Gaussian_ filter:

$$M=G(\sigma)*\begin{bmatrix}(\nabla_{x}I)^2 & \nabla_{x}I\nabla_{y}I \\ \nabla_{x}I\nabla_{y}I & (\nabla_yI)^2\end{bmatrix}$$

Such $M$ can then be decomposed into _eigenvectors_ $R$ and _eigenvalues_ $\lambda_{min}$, $\lambda_{max}$ (strong _eigenvector_ = strong edge component):

$$M=R\begin{bmatrix}\lambda_{max} & 0 \\ 0 & \lambda_{min}\end{bmatrix}R^{\top}$$

If _eigenvalues_ are large, a corner is detected because intensity change (gradient) is big in both $x$ and $y$ directions. But only the ratio and a rough magnitude is checked (calculating _eigenvalues_ is expensive). It's possible because $\det(M)=\lambda_1\lambda_2$ and $\text{trace}(M)=\lambda_1 + \lambda_2$ In practice, **Corner Response Function** (**CRF**) is checked against some threshold $t$ (usually $0.04 < \alpha < 0.06$ works):

$$\underbrace{\det(M)-\alpha\text{trace}^2(M)}_{\text{CRF}}>t$$

> **Non-maxima suppression** is applied after thresholding.

**Harris Detector** is rotation invariant (same eigenvalues if image is rotated) but not scale invariant (e.g., more corners are detected if a round corner is scaled)

**Hessian Corner Detector** - finds corners based on values of the determinant of the _Hessian_ of a region:

$$\text{Hessian}(I)=\begin{bmatrix}\nabla_{xx}I & \nabla_{xy}I \\ \nabla_{xy}I & \nabla_{yy}I\end{bmatrix}$$

### Local Feature Detection

**Automatic scale selection** - a scale invariant function which outputs the same value for regions with the same content even if regions are located at different scales. As scale changes, the function produces a different value for that region and the scales for both images is chosen where the function peaks out:

<center><div style="
background-image: url('https://slideplayer.com/slide/5292850/17/images/20/Automatic+Scale+Selection.jpg');
  width: 500px;
  height: 300px;
  background-position: bottom;
  background-size: cover;
"></div></center><br>

**Blob** - superposition of `2` ripples. A ripple is a _zerocrossing_ function at an edge location after applying **LoG**. Because of the shape of the **LoG** filter, it detects **blobs** (_maximum response_) as spots in the image as long as its size matches the spot's scale. In which case filter's scale is called _characteristic scale_.

> Note that in practice **LoG** is approximated with a difference of _Gaussian_ (**DoG**) at different values of $\sigma$. Many such differences form a scale space (_pyramid_) where local maximas among neighboring pixels (including upper and lower **DoG**) within some region are chosen as features

### Local Feature Description

**SIFT Descriptor** - a descriptor that is invariant to scale. A simple vector of pixels of some region does not describe a region well because a corresponding region in another image may be shifted causing mismatches between intensities. **SIFT Descriptor** creation:
1.  Calculate gradients on each pixel and smooth over a few neighbors
2. Split the region to `16` subregions and calculate a histogram of gradient orientations (`8` directions) at each
3. Each orientation is described by gradient's magnitude weighted by a _Gaussian_ centered at the region center
4. Descriptor is acquired by stacking all histograms (`4`$\times$`4`$\times$`8`) to a single vector and normalizing it

Actually, before the main procedure of **SIFT**, the orientation must be normalized - the gradients are rotated into rectified orientation. It is found by computing a histogram of orientations (region is rotated `36` times) where the largest angle bin represents the best orientation.

> To make the **SIFT Descriptor** invariant to affine changes, covariance matrix can be calculated of the region, then eigenvectors can be found based on which it can be normalized.

**SIFT Descriptor** is invariant:
* **Scale** - scale is found such that the scale invariant function has local maxima
* **Rotation** - gradients are rotated towards dominant orientation
* **Illumination** (partially) - gradients of sub-patches are used
* **Translation** (partially) - histograms are robust to small shifts
* **Affine** (partially) - eigenvectors are used for normalization

> When feature matches are found, they should be symmetric