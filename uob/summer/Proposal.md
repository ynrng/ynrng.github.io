# FetchBo

A Human-Robot Interaction Model Based on Commonsense Reasoning.
> Yanrong Wang - 2257486 - University of Birmingham


<!-- ## ABSTRACT -->


**Keywords**: Knowledge representation; Reasoning; Chore Robot; Fetching Robot;

## I.	INTRODUCTION
The purpose of the project is to introduce an efficient robot reasoning method which can help the robot better interact with human. When the robot is given a task, it will complete the task if possible and will suggest alternatives if exist. The robot will have the ability of reasoning about the results and actions it generated.
While the ability of commonsense reasoning and deduction is natural for human, it is not a simple task for robots and AI for most AI systems are designed to achieve specific tasks [1]. In this research, a scalable and generalisable method will be proposed to address this problem and lead to more understandable and controllable future research. It is essential for human to understand the decision process in order to utilise technology in some areas like healthcare and everyday assistants, etc.
## II.	RELATED WORK
### A.	Sequential Decision making
Researchers have made significant breakthroughs regarding generating sequence of pretrained basic actions for some high-level tasks, especially with the help of machine learning techniques [2] and large language models [3].
But normally, they lack the ability of reasoning and explain and require large amount of computing resources and time to achieve the goal. When task space needs to be extended, often those models need to be retrained and refined to suit the new scope.
### B.	Reasoning
Sap et al. [4] proposed 9 if-then relationships for everyday commonsense reasoning and used knowledge graph to represent them. A neural network is used to make the model more adaptive to new situation. This model has the ability to predict the sequence of events based on a given condition.
Sridharan et al. [5-7] showed encouraging results of reasoning using Answer Set Programming (ASP) for grasping tasks in various settings. Machine learning methods like RL or CNN were used to generate and update knowledge sets.
## III.	BACKGROUND
### A.	Reasoning
1.	Action Language
Action languages are formal models of part of a natural language used for describing transition diagrams of dynamic domains. Our architecture uses the action language AL [20], which has a sorted signature with three types of sorts: statics, which are domain attributes whose values do not change over time; fluents, which are domain attributes that can be changed; and actions. Fluents can be inertial, which can be directly modified by actions and obey the laws of inertia, or defined, which are not directly changed by actions and do not obey inertia laws. A domain literal is a domain attribute p or its negation ¬p. AL allows three types of statements:
l a causes lin impossible a0, . . . , ak
if p0,...,pm if p0,...,pm if p0,...,pm
State Constraints
Causal Laws Executability Conditions
where a is an action, l is a literal, lin is an inertial literal, and p0, . . . , pm are domain literals. Our architecture uses AL to describe the transition diagram of any given domain, as described below.

2.	ASP
Good knowledge representation language model should be elaboration tolerant. To achieve this, uniform problem representation should be used.
Basic methodology to construct an ASP is to first generate a potential stable model candidates then eliminate invalid candidates by integrity constraints test. After that, apply optimisation to the program, include logical optimisations.
Integrity constraint is used for eliminating unwanted solution candidates and is of form:
:- atom_1, … atom_k, not atom_k+1, ... not atom_n
Choice rule is used for providing choices over subsets of atoms and is of form:
{a_1,...,a_m} :- a_m+1,...,a_n, not a_n+1, ... , not a_o
Cardinality rule is used for controlling cardinality of subsets of and is of form:
a_0 :- l { a_1 ,..., a_m, not a_m+1 ,..., not a_n } u
Weighted literal w : k associates weight w with literal k.
Weight rule is used for bounding sum of subsets of literal weights and is of form:
a_0 :- l { w_1 : a_1, ...,w_m : a_m, w_m+1 : not a_m+1, ..., w_n : not a_n } u
 Conditional Literals
3.	Graph Neural Network
### B.	Machine Learning Methods
1.	Reinforcement Learning
2.	(Deep) Neural Network
3.	Decision Tree
4.	Natural Language Model
<!-- ## IV.	METHODOLOGY -->
## V.	IMPLEMENTATION (INCLUDING VALIDATION AND TESTING)
### A.	Project Scope Specification in Action Language
<!-- The axioms of the RA domain include statements such as:
pickup(robot, object) causes in_hand(robot, object) (4a)
obj_relation(below,B,A) if obj_relation(above,A,B) (4b)
obj_relation(behind,B,A) if obj_relation(infront,A,B) (4c)
impossible pickup(robot, object) if in_hand(robot, object) (4d)
impossible putdown(robot, object, location) if not in_hand(robot, object) (4e) -->

---

The robot will be working in the domain of “home assistant” and it will be asked to do fetching tasks. Robot should generate steps to achieve the goal.
3 rooms are provided. Kitchen, Library and Office.
Atomic actions, pretrained actions will include:
•	pick(X)
•	place(Y)
•	move_item(X, Y)
•	navigate_to(X)
•	search_item (X)
Following items will be used and can be recognised: (=> indicates “can be in” and is calculated with possibility, X= indicates “not allowed”, both are learnable through time when certain actions are taken)
•	Book (B1, B2) => Library, Office
•	Toy (T1, T2) => Office
•	Apple (A), Orange (O) => Kitchen
•	Water Bottle (W), Coffee(C), Energy drink(E) => Kitchen, Office
Extra relationships and rules between items and actions (learnable through reinforcement learning and human feedbacks):
•	Boring is opposite of Happy in 80% of time
•	Toy add to happiness for 70% of time
•	Coffee and Energy drink add to energy for 90%, 80% of time respectively
•	……
Instructions can be given as follows:
•	I am hungry/ boring/tired.
•	Can you bring me X from Y. (item X does not necessarily be in position Y)
Reasoning can be asked as follows:
•	Why do you bring Coffee instead of Apple? (When I am tired)
•	Where do you find the book?
•	Why you not bring X from Y as I told you?(When X is in other place)
### B.	Resources
1.	Hardware
•	A physical mobile robot operating on ROS system equipped with camera and laser/LiDAR sensors, provided by Robot
•	lab (Need instructions of access to robot).
•	Laptop (Mac/Ubuntu system).
•	No intense GPU usage is needed.
2.	Software
•	ROS environment on laptop.
•	Answer Set Programming (ASP) ROSoClingo [8] for reasoning.
•	Python 3 environment for interactions with robot and others.
•	Gitlab for source repository [8].
### C.	Data
The data needed for demonstration of the proposed method will be collected during coding and testing stage. The demonstration of physical robot will happen inside the CS building, University of Birmingham. A map of the environment will be acquired. A simulation environment will be created based this the map during developing and testing stage. Test cases will be designed based on the map and can be automatically generated by program. A collection of base knowledge will be designed during the coding process. For reinforcement learning, data will be gathered from the environment and test cases.
If more complex testing cases are required, there are 3d open source dataset available (eg. Replica [9])
## VI.	RESULTS AND EVALUATION
In evaluation and testing stage, I will invite some volunteers (less than 10 people) to evaluate the output of the system.

## VII.	SUMMARY AND CONCLUSIONS

## Progress

<!-- ## REFERENCES
[1]	E. Davis and G. Marcus, “Commonsense reasoning and commonsense knowledge in artificial intelligence,” Commun ACM, vol. 58, no. 9, pp. 92–103, 2015.
[2]	A. Szot et al., “Habitat 2.0: Training home assistants to rearrange their habitat,” Advances in Neural Information Processing Systems, vol. 34, pp. 251–266, 2021.
[3]	M. Ahn et al., “Do as i can, not as i say: Grounding language in robotic affordances,” arXiv preprint arXiv:2204.01691, 2022.
[4]	M. Sap et al., “Atomic: An atlas of machine commonsense for if-then reasoning,” in Proceedings of the AAAI conference on artificial intelligence, 2019, vol. 33, no. 01, pp. 3027–3035.
[5]	M. Sridharan and T. Mota, “Combining Commonsense Reasoning and Knowledge Acquisition to Guide Deep Learning in Robotics,” arXiv preprint arXiv:2201.10266, 2022.
[6]	T. Mota, M. Sridharan, and A. Leonardis, “Integrated commonsense reasoning and deep learning for transparent decision making in robotics,” SN Computer Science, vol. 2, no. 4, pp. 1–18, 2021.
[7]	D. Meli, M. Sridharan, and P. Fiorini, “Inductive learning of answer set programs for autonomous surgical task planning,” Machine Learning, vol. 110, no. 7, pp. 1739–1763, 2021.
[8]	Y. Wang, “Gitlab Repository,” 2022. https://git-teaching.cs.bham.ac.uk/mod-msc-proj-2021/yxw257
[9]	J. Straub et al., “The Replica dataset: A digital replica of indoor spaces,” arXiv preprint arXiv:1906.05797, 2019. -->