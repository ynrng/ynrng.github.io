# 2024 ICAPS
>  30/May

## *[Brian C. Williams]*  Risk-bounded Task and Motion Planning in the Real World
![outline](/figures/_posts/line.png)

### risk-aware State plan motion plannnig
_multi agent path finding (mapf)_, object:
> 1. collision free path
> 2. minimise path ( time )

1. Conflict based search ( cbs ) (generalises conflict directed A*)
   > complete, optimal, slow
2. Priority based search ( pbs )
   > imcomplete, suboptimal, quick

![safty](/figures/_posts/safty%20utilitarian%20func.png)

![ph optimal planning](/figures/_posts/fh%20optimal%20planning.png)
Probabilistic Sulu ( p-sulu)

1 Risk allocation
> A *GOOD* safety margin.

2 Iterative risk allocation (IRA)
> guaranteed optimal :
>   ![p119](/figures/_posts/p119.png)

3 convex risk allocation
>   ![p125](/figures/_posts/p125.png)


### risk-aware planning with learnt behaviors ( LaPLASS)
objectives:
- non-linear dynamincs
- non-gaussian distributions
- handle unmodeled dynamics (NN)

use VAE for latent linear dynamics
![](/figures/_posts/p142.png)


<!-- ## *[Jeremy Frank]* The Distributed Spacecraft Autonomy<u> (DSA)</u> Project -->














<!-- >  31/May -->