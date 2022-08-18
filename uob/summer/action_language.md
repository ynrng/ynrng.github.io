
<style>
   code {
      color: peru;
   }
</style>
# FetchBot

## AL of the Robot Assistent:

<!-- l if p0,...,pm; State Constraints
a causes l_in if p0,...,pm; Causal Laws
impossible a0,...,ak if p0,...,pm; Executability Conditions

where a is an action, l is a literal, l_in is an inertial literal, and p0,..., pm are domain literals -->

---
The Robot will be working in the domain of “home assistant” and it will be asked to do fetching related tasks. Rob should generate steps to achieve the goal.

<!-- W4
--- -->
<!-- I have some questions as I wrote this, can you answer them so I can continue working on this. And please point out other things that I should include if I had missed: -->

<!-- 1. Because the Loc of all Objs are not known. So in the begining, the Rob need to make observations. Which one is better?
   - Should I make the Rob circle around the whole map and make all the initial observations at once (this will make all inital positions of Objs known),
   - OR should I make Rob go to one place and make partial observations and plans (go to table and define status of all Objs on the table, clean the table, then go to 2nd place, clean it, ...) and then combine results in the end ?
1. Are these 2 features  suffient enough as suggesting alternative?
   - If given instructions like 'put away all Objs into drawer', but drawer is full (meaning #count(in(Obj, drawer)) = maximum), then it will suggest to put remaining Objs into other container space. Like the Goal(clean) states below.
   -  If given instuctions like 'fetch apple from box', and apple's not in the box, the Rob will still find apple from other place and bring it. (More specific steps depend on question 1)
2. Underlined in "Causal Laws" section.
3. Should I include history related occurs() and holds in this? -->

`Sorts` definition in [fetchbot.sp](https://git-teaching.cs.bham.ac.uk/mod-msc-proj-2021/yxw257/-/blob/main/yolobot/src/yolobot_asp/scripts/asp/fetchbot.sp)

---
Given:
- coordinates of 3 locaions.

Unknown, can be observed (obs):
- total Objects. Observations.
- position of Objects. Observations.
- whether Location is locked. `locked` will be a deduction of failed action of open/inconsistent action and observation.

Initial setup (examples):
```ASP
holds(at(rob1, table), 0).
holds(hand_empty(R), 0).

-holds(opened(L), 0) :- #loc_close(L).

holds(at(book1, table), 0).
holds(at(apple, table), 0).
holds(at(book3, drawer), 0).
holds(locked(box), 0).
```

<!-- TODO count can be replaced by volume if time permits -->
Goal (examples):
- clean = #minimise {at(Obj, space_open): at(Obj, container_open)}.
```ASP
goal(I) :-
  holds(empty(table), I),
  holds(empty(sofa), I),
  holds(hand_empty(R), I).

% solution generated
% {occurs(move(rob1,drawer),0), occurs(open(rob1,drawer),1),
occurs(move(rob1,table),2), occurs(pick(rob1,book1),3),
occurs(move(rob1,drawer),4), occurs(place(rob1,book1),5),
occurs(move(rob1,table),6), occurs(pick(rob1,apple),7),
occurs(move(rob1,drawer),8), occurs(place(rob1,apple),9)}
```

- fetch:
```ASP
at(apple, sofa).
```
<!-- - set_table = #count(at(Obj, table)) = 3 -->


<!-- instance.lp are defined at bottom: -->

---
## Change note W5:
- combine at & in;
- rename navigate to move;
- update rules (highlighted by 🆕)
- environment reset (e.g. close drawer in the end if ever opened it)

---
**State Constraints**
<!-- - xx IF xx -->
- $\neg$ `at(R, L2)` IF `at(R, L1)`, `L1`$\neq$`L2`
<!-- -  -->
-  🆕 holds(status_changed(F), I) IF holds(F, 0), -holds(F, I), #inertial_fluent(F).
-  🆕 holds(status_changed(F), I) IF holds(F, I), -holds(F, 0), #inertial_fluent(F).
   > for environment reset
<!-- - -->
- 🆕 `count_in(L, N)` IF `N = #count{Obj : at(Obj, L)}`
   > combine at & in
<!-- -  -->
- $\neg$ `in_hand(R, O1)` IF `in_hand(R, O2)`, `O1`$\neq$`O2`
<!-- - $\neg$ `in_hand(R, O)` IF `hand_empty(R)` -->
<!-- -  -->
- `opened(Loc_open)`
<!-- - $\neg$ `opened(Loc)` IF  `locked(Loc)` -->
<!-- -  -->
- `empty(Loc)` IF `count_in(Loc, 0)`
<!-- - $\neg$ `empty(Loc)` IF` count_in(Loc, N)`, `N > 0` -->
<!-- -  -->
<!-- maximum Objs to fill the specific container, should use weighted val to represent volume if time permits  -->
- `full(Loc)` IF `count_in(Loc, 10)`, `L = drawer`
- `full(Loc)` IF `count_in(Loc, 3)`, `L = box`
- `full(Loc)` IF `count_in(Loc, 10)`, `L = table`
- `full(Loc)` IF `count_in(Loc, 5)`, `L = sofa`
   > numbers are arbitrarily defined.

<!-- - $\neg$ `empty(Loc)` IF not `empty(Loc)` -->
<!-- -  -->
<!-- - $\neg$ `opened(Loc)` IF not `opened(Loc)` -->
<!-- -  -->
<!-- - $\neg$ locked(Loc_close) IF not locked(Loc_close) -->
<!-- -  -->
<!-- - `can_pick(Rob, Obj)` IF `at(Rob, Loc)`, `opened(Loc)`, `at(Obj, Loc)`, `L1!`$\neq$`L2` -->
<!-- history -->
<!-- - step=step+1 IF not goal()
- holds(fluent, T) IF not occurs(action, T), holds(fluent, T-1), actions causes fluent change
- `at(Obj, Loc)` | not `at(Obj, Loc)` IF {new observation comes at Loc} %% -->
<!-- -  -->
- `hand_empty(R)` IF `0 == #count{O : in_hand(R, O)}`

---
**Causal Laws**
<!-- - xx CAUSES xx IF xx -->
- `open(Rob, Loc_close)` CAUSES `opened(Loc_close)`
<!-- -  -->
- `close(Rob, Loc_close)` CAUSES $\neg$ `opened(Loc_close)`
<!-- -  -->
- `pick(Rob, Obj)` CAUSES `in_hand(Rob, Obj)`
- 🆕 `pick(Rob, Obj)` CAUSES  $\neg$ `at(Obj, Loc)` IF `at(Rob, Loc)`
   > combine at & in
<!-- - `pick(Rob, Obj)` CAUSES $\neg$ `hand_empty(R)` -->
<!-- - `pick(Rob, Obj)` CAUSES `count_in(Loc, N-1)` IF `count_in(Loc, N)`, `at(Rob, Loc)` -->
<!-- -  -->
- `place(Rob, Obj)` CAUSES $\neg$ `in_hand(Rob, Obj)`
- 🆕 `place(Rob, Obj)` CAUSES   `at(Obj, Loc)` IF `at(Rob, Loc)`
<!-- - `place(Rob, Obj)` CAUSES `hand_empty(R)` -->
<!-- - `place(Rob, Obj)` CAUSES `count_in(Loc, N+1)` IF `count_in(Loc, N)`, `at(Rob, Loc)` -->
<!-- -  -->
- 🆕 `move(Rob, Loc)` CAUSES `at(Rob, Loc)`
   > combine at & in

<!-- <u>I have some other rules the Rob should follow,</u> but it's causing actions instead of caused by action, not sure where to put them:
- place(Rob, Obj, Loc_close) CAUSES close(Rob, Loc_close) IF #count(empty(Loc_open)) = #count(Loc_open) OR #count(at(Obj, Loc_close)) == maximun
- at(Rob, LocA) CAUSES move(Rob, LocB) IF #count(at(Obj, LocB)) == 0, #count(at(Obj, LocA)) > 0 -->

<!-- Can I assume all Objs are recognisable and not occuluded? observe can be using pretrained CNN etc.  -->
<!-- - observe(Rob, Loc, Obj) CAUSES `at(Obj, Loc)` -->

---
**Executability Conditions**
- IMPOSSIBLE `open(Rob, Loc_open)`
- IMPOSSIBLE `open(Rob, Loc)` IF `locked(Loc)`
- IMPOSSIBLE `open(Rob, Loc)` IF `opened(Loc)`
- IMPOSSIBLE `open(Rob, Loc)` IF $\neg$ `at(Rob, Loc)`
- IMPOSSIBLE `open(Rob, Loc)` IF `in_hand(Rob, Obj)`
<!-- - IMPOSSIBLE xx IF xx -->
- IMPOSSIBLE `close(Rob, Loc_open)`
- IMPOSSIBLE `close(Rob, Loc)` IF `locked(Loc)`
- IMPOSSIBLE `close(Rob, Loc)` IF $\neg$ `opened(Loc)`
- IMPOSSIBLE `close(Rob, Loc)` IF $\neg$ `at(Rob, Loc)`
- IMPOSSIBLE `close(Rob, Loc)` IF `in_hand(Rob, Obj)`
<!-- -  -->
- IMPOSSIBLE `pick(Rob, Obj1)` IF `in_hand(Rob, Obj2)`
- 🆕 IMPOSSIBLE `pick(Rob, Obj)` IF `at(Rob, Loc1)`, `at(Obj, Loc2)`, `Loc1` $\neq$ `Loc2`
- 🆕 IMPOSSIBLE `pick(Rob, Obj)` IF `at(Rob, Loc)`, $\neg$ `opened(Obj, Loc)`
  > replace can_pick
- IMPOSSIBLE `pick(Rob, Obj)` IF `at(Rob, Loc)`, `empty(Loc)`
- IMPOSSIBLE `pick(Rob, Obj)` IF `at(Rob, Loc)`, `locked(Loc)`
<!-- -  -->
- IMPOSSIBLE `place(Rob, Obj)` IF $\neg$ `in_hand(Rob, Obj)`
- IMPOSSIBLE `place(Rob, Obj)` IF `at(Rob, Loc)`, $\neg$ `opened(Loc)`
- IMPOSSIBLE `place(Rob, Obj)` IF `at(Rob, Loc)`, `full(Loc)`
- IMPOSSIBLE `place(Rob, Obj)` IF `at(Rob, Loc)`, `locked(Loc)`
<!-- -  -->
- 🆕 IMPOSSIBLE `move(Rob, Loc)` IF `at(Rob, Loc)`
   > combine at & in
<!-- - 🆕 IMPOSSIBLE `move(Rob, Loc)` IF `locked(Space_open)`
   > locked space should not be accessed by robot -->
<!-- - IMPOSSIBLE observe(Rob, Loc, Obj) IF xx -->

<!-- |    |  |  |
|---:|---|---|
| IMPOSSIBLE xx | IF | xx |
|  |  |  |  | -->


---
<!-- ---
**State Constraints**
- not obj_in(food, library)
- not obj_in(books, kichen)
- `can_pick(Rob, Obj)` IF Rob_in(Rob, Loc), obj_in(Obj, Loc)
- xx IF xx

---
**Causal Laws**
- `move(Rob, Loc)` CAUSES Rob_in(Rob, Loc)
- `pick(Rob, Obj)` CAUSES in_hand(Rob, Obj)
- `place(Rob, Obj)` CAUSES obj_in(Obj, Loc)
- xx CAUSES xx IF xx

---
**Executability Conditions**
- IMPOSSIBLE `move(Rob, Loc)` IF Rob_in(Rob, Loc)
- IMPOSSIBLE `pick(Rob, Obj)` IF not `can_pick(Rob, Obj)`
- IMPOSSIBLE `pick(Rob, Obj)` IF in_hand(Rob, Obj)
- IMPOSSIBLE `place(Rob, Obj)` IF not in_hand(Rob, Obj)
-
- IMPOSSIBLE place(Rob, food) IF Rob_in(Rob, library)
- IMPOSSIBLE xx IF xx

--- -->

<!-- The Rob will be working in the domain of “home assistant” and it will be asked to do fetching tasks. Rob should generate steps to achieve the goal.
3 rooms are provided. Kitchen, Library and Office.
Atomic actions, pretrained actions will include:
- pick(X)
- place(Y)
- move_item(X, Y)
- move_to(X)
- search_item (X)
Following items will be used and can be recognised: (=> indicates “can be in” and is calculated with possibility, X= indicates “not allowed”, both are learnable through time when certain actions are taken)
- Book (Bk1, Bk2) => Library, Office
- Toy (T1, T2) => Office
- Apple (Ap), Orange (Or) => Kitchen
- Water Bottle (W), Coffee(C), Energy drink(E) => Kitchen, Office
Extra relationships and rules between items and actions (learnable through reinforcement learning and human feedbacks):
- Boring is opposite of Happy in 80% of time
- Toy add to happiness for 70% of time
- Apple and Orange drink reduce hunger for 50%, 30% of time respectively
- ……
Instructions can be given as follows:
- I am hungry/ boring/tired.
- Can you bring me X from Y. (item X does not necessarily be in position Y)
Reasoning can be asked as follows:
- Why do you bring Coffee instead of Apple? (When I am tired)
- Where do you find the book?
- Why you not bring X from Y as I told you?(When X is in other place) -->
