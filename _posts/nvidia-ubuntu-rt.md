
---
layout: post
title: "Setup nvidia env with a self compiled ubuntu realtime kernel"
categories:
- ubuntu
- nvidia
date: 2024-05-01
---

1. Setup realtime kernel.
2. Setup nvidia driver, [extra steps](https://gist.github.com/ynrng/cb0de1bd397e8ec90e22ea3e0bbd202e) needed when on a self-compiled rt kernel.
3. Install [NVIDIA Container Toolkit](Installing the NVIDIA Container Toolkit)
4. check nvidia status
    ```sh
    watch -n 1 nvidia-smi
    ```
5. Install [docker](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository) via apt. Do the [post-installation setup](https://docs.docker.com/engine/install/linux-postinstall/).
6. Run a [sample](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/sample-workload.html) for nvidia docker
