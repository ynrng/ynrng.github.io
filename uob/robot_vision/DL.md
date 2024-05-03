---
layout: page
title: Deep Learning
---
<!-- # [Home](../../index.md) > [Robot Vision](README.md) > DL -->


## Deep Learning for Computer Vision

Learning types:
* **Reinforcement learning** - learn to select an action of maximum payoff
* **Supervised learning** - given input, predict output. `2` types: _regression_ (continuous values), _classification_ (labels)
* **Unsupervised learning** - discover internal representation of an input (also includes _self-supervised_ learning)

Artificial neuron representation:
1. **$\mathbf{x}$** - input vector ("synapses") is just the given features
2. **$\mathbf{w}$** - weight vector which regulates the importance of each input
3. **$b$** - bias which adjusts the weighted values, i.e., shifts them
4. **$\mathbf{z}$** - net input vector _$\mathbf{w}^{\top}\mathbf{x}+b$_ which is linear combination of inputs
5. **$g(\cdot)$** - activation function through which the net input is passed to introduce non-linearity
6. **$\mathbf{a}$** - the activation vector _$g(\mathbf{z})$_ which is the neuron output vector

Artificial neural network representation:
1. Each neuron receives inputs from inputs neurons and sends activations to output neurons
2. There are multiple neuron layers and the more there are, the more powerful the network is (usually)
3. The weights learn to adapt to the required task to produce the best results based on some loss function

Popular activation functions - _ReLU_, _sigmoid_ and _softmax_, the last two of which are mainly used in the last layer before the error function:

$$\text{ReLU}(x)=\max(0, x)$$

$$\sigma(x)=\frac{1}{1+\exp(-x)}$$

$$\text{softmax}(x)=\frac{\exp(x)}{\sum_{x'\in\mathbf{x}}\exp(x')}$$

Popular error functions - _MSE_ (for regression), _Cross Entropy_ (for classification):

$$\text{MSE}(\hat{\mathbf{y}}, \mathbf{y})=\frac{1}{N}\sum_{n=1}^N(y_n-\hat{y}_n)^2$$

$$\text{CE}(\hat{\mathbf{y}}, \mathbf{y})=-\sum_{n=1}^N y_n \log \hat{y}_n$$

**Backpropagation** - weight update algorithm during which the gradient of the error function with respect to the parameters $\nabla_{\mathbf{w}}E$ is calculated to find the update direction such that the updated weights $\mathbf{w}$ iteratively would lead to minimized error value.

$$\mathbf{w}\leftarrow \mathbf{w} - \alpha \nabla_{\mathbf{w}} E(\mathbf{w})$$
