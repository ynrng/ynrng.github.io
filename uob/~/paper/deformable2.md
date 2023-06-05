# Deformables

## Challenges:
- Representation:
  - Infinite states, High dimensional in nature
    - For rigid body, normally it’s sufficient to represent objects using <x,y,z,$\alpha$,$\beta$,$\gamma$> - **6DoF**. We often use transformation matrices - **16DoF** - to give a uniform and linearised representation.
    - For DOs, because not all points of the object are moving in the same way naturally. If we care about the actual points' positions, (most cases, we do as they generate different grasping conditions) we need more DoF to represent them.
    - Depends on precision needed, states can grow exponentially.
  - Simplify geometry
      - e.g. using tension to limit obj’s DoF. [Laezza]
      - using topology constraints [Yamazaki]
      - Corners, mesh, feature points  [Lips]. Hand picked and need to know the materials, pre-acquired info.
  - Goal independent rep for all?
- Control:
  - Material dependent
    - Manipulation can vary as frictions and compliance are different, resulting in complex contact & friction forces *(later in manipulation primitives)*
    - Elastic  [Yu] / Plastic [Cherubini]  / Viscous / Elasto-Plastic [Matl] [Shi]
  - environment feedback, extrinsic contacts
- Data:
  - How to generate repeatable data
  - full system is partially observable
  - can't measure full states from real world ( but only controls & observations)


## Background:
- **virtual fingers (VF)**: a group of fingers that act as a single unit in a structure representing a task. [T. Iberall]
- **Opposition Space**: the area within the coordinates of the hand where opposing forces can be exerted between _virtual finger surfaces_ in effecting a stable grasp or during transitions. [T. Iberall]
- manipulation primitives:
  - [Júlia Borràs] (also seen used in other works but not systematically defined)
    -  Adding/removing extrinsic contacts.
    <!-- - These are regrasp actions where the origin/destination has an extrinsic VF while the destination/origin doesn’t, respectively. -->
    -  Grasping.
    <!-- - A regrasp from a single extrinsic VF grasp (first row in Fig. 2) to any other grasp in the figure. -->
    - Releasing.
    <!-- -  The opposite of grasping, that is, a regrasp from any grasp to a single extrinsic VF grasp. -->
    -  Regrasping.
    <!-- - Pure regrasp action, that is, any transition between grasps that does not belong to the two previous types. -->
    - Sliding.
    <!-- - Manipulation where the initial and end grasps are the same, but the cloth has moved with respect to the grasp without losing contact completely. Examples include edge tracing or flattening on a table. -->
    -  In-grasping motions.
    <!-- - Single hand or bimanual grasps that are fixed and moved by the arms without performing any regrasp but changing the state of the cloth. Examples include applying tension between two PP grasps or the motion to fold a cloth after is grasped. -->
  - [Cherubini] (molding plastic materials, sands)
    - poke, grasp, knock
- Define a grasp as a set of opposing geometric entities, consisting of points (**P**), lines (**L**) and planes (**$\Pi$**). [T. Iberall]
  - (different types of grasps)
- Soft robots (not included, e.g. spiderbot)



## Categorises:
### By deformable objects:
- 1d - e.g. Ropes. Deformable Linear Objects(DLO). [Laezza] [Yu] [Mitrano] [Preiss] [Keipour]
- 2d - e.g. cloth. [Borràs] [Yamazaki] [Lips]
- 3d - e.g. dough. Rarely studied. [Cherubini](molding plastic materials, sands) [Shi] (plasticine)

### By arms:
- single arm [Preiss] [Cherubini] (molding) [Laezza]
- double arms  [Yu] [Mitrano] [Lips] [Cherubini]  [Laezza]


### By grippers:
- Generalistic grippers
  - no regrasp  [Yu] [Mitrano] [Preiss]
    - [Cherubini] + planning through points
  - predefined grasps
    - [Lips](but with specified fingertips)
    - [Cherubini](molding plastic materials, sands)
  -  [Laezza] parallel gripper
- Specifically designed (for task) grippers [Youcef]
    - How the design of gripper enables/ constrains the availability of grasps.
    - How clear definition of grasps can guide the design of grippers
- Vacuum grippers, industrial solution


### By Perception:
- FT sensors only  [Yu] [Mitrano] [Preiss] [Laezza]
- visual servoing:
  - [Yamazaki]
  - [Lips] extract semantic key points from synthetic data
  - [Cherubini] using cnn for prediction and observation
- tactile sensor
- multi sensors


### By learning
 - model from
   - analitical model: approximation, requires accurate params
   - data driven
     - offline: for learning global models params (data inefficient)
     - online: for learning local configuration, (adaptive)  [Mitrano]
     - mixed [Yu]
   -  (expert) demonstrations
 - sim vs real [Goldberg] (Real2Sim2Real)
   - Reset problem ( evaluate )



## Future Work:
- Finding general solutions
  - modularise to generalise [Youcef]
- Benchmarks
  - Identifying manipulation primitives that are common across different tasks
- sim 2 real gap [Goldberg]
- What do I want to do
-


## References:
1. <u>Júlia Borràs</u>, G. Alenyà and C. Torras, "A Grasping-Centered Analysis for Cloth Manipulation," in IEEE Transactions on Robotics, vol. 36, no. 3, pp. 924-936, June 2020, doi: 10.1109/TRO.2020.2986921.
3. Arnold, Solvi, Daisuke Tanaka, and <u>Kimitoshi Yamazaki</u>. "Cloth manipulation planning on basis of mesh representations with incomplete domain knowledge and voxel-to-mesh estimation." arXiv preprint arXiv:2103.08137 (2021).
4. <u>Youcef Mezouar</u>: The european project Softmanbot : handling deformable and flexible materials for the industry [Video]
5. [1986] <u>T. Iberall</u>, Opposition Space as a Structuring Concept for the Analysis of Skilled Hand Movements
6. <u>Mingrui Yu</u>, Hanzhong Zhong, Xiang Li - Shape Control of Deformable Linear Objects with Offline and Online Learning of Local Linear Deformation Models
7. Louis Dehaybe, Olivier Brüls - An SE(3)-based formulation of the shape servoing problem
8. <u>Peter Mitrano</u>, Dmitry Berenson - Data **Augmentation** for Online Learning of Rope Manipulation
9. <u>Thomas Lips</u>, Victor-Louis De Gusseme, Francis wyffels - Learning Keypoints from Synthetic Data for Robotic Cloth Folding
10. Irene Garcia-Camacho, Júlia Borràs, Berk Calli, Adam Norton, Guillem Alenyà - Cloth manipulation and perception competition
11. <u>James A. Preiss</u>, David Millard, Tao Yao, Gaurav S. Sukhatme - Deep Recurrent Models for Nonlinear Model Predictive Control in Deformable Manipulation Tasks
12. Youcef Mezouar (Mohammad Al Khatib): The european project Softmanbot : handling deformable and flexible materials for the industry
13. <u>Ken Goldberg</u>: Real2Sim2Real: A Model for Deep Learning to Manipulate Deformable Objects
14. <u>Andrea Cherubini</u>: See and shape: vision-based robot manipulation of non-rigid objects
15. <u>Rita Laezza</u>, Finn Süberkrüb, Yiannis Karayiannidis - Blind Manipulation of Deformable Linear Objects Based on Force Information from Environmental Contacts
16. Holly Dinkel, Jingyi Xiang, Harry Zhao, Brian Coltin, Trey Smith, Timothy Bretl - Wire Point Cloud Instance Segmentation from RGBD Imagery with Mask R-CNN Contacts
17. Shengyin Wang, Matteo Leonetti, Mehmet Dogar - Goal-Conditioned Model Simplification for Deformable Object Manipulation
18. Shaoxiong Yao, Kris Hauser - Online Estimation of Point-based Volumetric Stiffness Model Using Joint Torque Sensors
19. <u>Azarakhsh Keipour</u>, Mohammadreza Mousaei, Maryam Bandari, Stefan Schaal, Sebastian Scherer - Detection and Physical Interaction with Deformable Linear Objects
20. Cristiana de Farias, Brahim Tamadazte, Rustam Stolkin, Naresh Marturi - Grasp Transfer for Deformable Objects by Functional Map Correspondence
21. Shuran Song: The Reasonable Effectiveness of Dynamic Manipulation for Deformable Objects
22. Rika Antonova: Distributional Representations and Scalable Simulations for Real-to-Sim with Deformables
23. Youngsun Wi, Pete Florence, Andy Zeng, Nima Fazeli - VIRDO: Visio-tactile Implicit Representations of Deformable Objects
24. [<u>Haochen Shi</u>](https://deformable-workshop.github.io/icra2022/spotlight/WDOICRA2022_06.pdf), Huazhe Xu, Zhiao Huang, Yunzhu Li, Jiajun Wu - RoboCraft: Learning to See, Simulate, and Shape Elasto-Plastic Objects with Graph Networks
25. Gautam Salhotra, I-Chun Arthur Liu, Marcus Dominguez-Kuhne, Gaurav S. Sukhatme - Learning Deformable Manipulation from Expert Demonstrations
26. Alex LaGrassa, Oliver Kroemer - Planning with Model Preconditions for Water Manipulation
27. Priya Sundaresan, Rika Antonova, Jeannette Bohg - DiffCloud: Real-to-Sim from Point Clouds with Differentiable Simulation and Rendering of Deformable Objects
28. Alan Kuntz & Isabella Huang: Large-Scale Simulation for Calibration-Free Sim to Real Transfer of Deformable Object Manipulation
29. <u>Carolyn Matl</u>: Deformable Elasto-Plastic Object Shaping using an Elastic Hand