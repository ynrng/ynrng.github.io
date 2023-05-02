# ROS2 for M1 Mac with Parallels

Yán @ 2022

<!-- >references: -->


## Upgrade from Ubuntu 20.04 -> 22.04
Because each ROS has a specific supporting system version. So when upgrading the system, we need to uninstall the old version ROS and install the new version. For me, it was from Foxy to Humble.

Luckily ROS has automated this process. [Check here](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html#uninstall).
Also if you have installed Gazebo, you need to do the same with the dependence too. Let's just use the same command and do:
```sh
sudo apt remove ~nlibignition-* && sudo apt autoremove
```
