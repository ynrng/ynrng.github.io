# Language Model

## construct questions
- why do
- why not do
- why believe
- why not believe
<!-- - what
- where
- how -->

## W13 - example run

For generated plan:

{occurs(move(rob1,drawer),0),\
occurs(open(rob1,drawer),1),\
occurs(move(rob1,table),2),\
occurs(pick(rob1,book1),3),\
occurs(move(rob1,drawer),4),\
occurs(place(rob1,book1),5),\
occurs(move(rob1,table),6),\
occurs(pick(rob1,food1),7),\
occurs(move(rob1,drawer),8),\
occurs(place(rob1,food1),9),\
occurs(close(rob1,drawer),10)}

### why do
> Q1: Why did you move to drawer in step 0?

A1: Because I want  to be at drawer, So I can open drawer.


> Q2: Why did you open drawer in step 1?

A2-*long ver*: Because I want drawer to be opened, So I can pick book1, place book1, pick food1, place food1, close drawer.

A2-*short ver*: Because I want drawer to be opened, So I can pick book1.


> Q3: Why did you move to table in step 2?

A3: Because I want  to be at table.




### why not do
### why believe
### why not believe



## nlp with python
> [nltk](https://www.nltk.org/) and [book](https://www.nltk.org/book/ch00.html)
>
> cite: Bird, Steven, Edward Loper and Ewan Klein (2009), Natural Language Processing with Python. O’Reilly Media Inc.

## map literals to words & sentences

## Qs:
Language Model.
How detail.
can i say only these questions can be asked.


<!-- ## allowed interactions
- why do you [open] the [drawer] at step [1]?
  > (track using Causal Laws) I want the drawer to be opened. Tracking depth: 1. Answer
- why do you believe [apple] is at [table] at step [2]?
  > track using -->

<!-- why do you [move] to [drawer] at step [0]?
why do you [pick] up [apple] at step [2]?
why do you [place] up [apple] at step [3]? -->
<!-- why do you (change plans) at step [2]? -->


there will be NO HOW questins.