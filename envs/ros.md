# ROS2 for M1 Mac

Yanrong @ 2022

>references:

> [Building ROS 2 on macOS](https://docs.ros.org/en/galactic/Installation/Alternatives/macOS-Development-Setup.html)

> [How to build and install ROS2 on macOS Big Sur M1](http://mamykin.com/posts/building-ros2-on-macos-big-sur-m1/)

> [Cannot install pygraphviz on Mac OS 10.11.6 #100](https://github.com/pygraphviz/pygraphviz/issues/100)


## Homebrew ❗️
If you are migrating from an Intel chip to a M1 chip, high chances are your are going to encounter problems with [homebrew](homebrew). Solve that first.

The following solutions are all based on a new clean version of system environment.
Cuz I don't like virtual machine ( bite me ).

Suppose you installed the homebrew, you should have the following line in your `~/.zprofile` (or `~/.bash_profile` , same in the following context)
```zsh
eval "$(/opt/homebrew/bin/brew shellenv)"
```
And you should use `brew --prefix` to get the full path for following setups.


## Environments
I'm using 2021 Macbook Pro with M1 Max Chip runing macOS Monterey(12.2).
I have `python@3.9` installed through `brew`

(Following instructions after `brew install openssl@3` for  `OPENSSL_ROOT_DIR` and `PKG_CONFIG_PATH` PLUS add `PYTHONPATH`.)

In `.zshrc`, I have:
```zsh
export OPENSSL_ROOT_DIR=/opt/homebrew/opt/openssl@3
export PKG_CONFIG_PATH="/opt/homebrew/opt/openssl@3/lib/pkgconfig"
export PYTHONPATH=$PYTHONPATH:/opt/homebrew/lib/python3/site-packages # depends on your version of python
```
## Install prerequisites
Follow [Install prerequisites](https://docs.ros.org/en/galactic/Installation/Alternatives/macOS-Development-Setup.html#install-prerequisites) for Step 1-3.

For Step **4**, replace `/usr/local/opt/qt@5` with `brew --prefix qt@5`
```sh
# install dependencies for Rviz
brew install qt@5 freetype assimp

# Add the Qt directory to the PATH and CMAKE_PREFIX_PATH
export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$(brew --prefix qt@5)
export PATH=$PATH:$(brew --prefix qt@5)/bin
```

Follow Step 5

For Step **6**, copy everything else except for `mypy==0.761` (which should be `mypy`) and `pygraphviz`. So you have sth like this.
```bash
python3 -m pip install -U \
 argcomplete catkin_pkg colcon-common-extensions coverage \
 cryptography empy flake8 flake8-blind-except flake8-builtins \
 flake8-class-newline flake8-comprehensions flake8-deprecated \
 flake8-docstrings flake8-import-order flake8-quotes ifcfg \
 importlib-metadata lark-parser lxml mock mypy netifaces \
 nose pep8 pydocstyle pydot pyparsing \
 pytest-mock rosdep setuptools vcstool matplotlib psutil rosdistro
```

To install `pygraphviz`. Run,
```bash
brew install graphviz
pip3 install graphviz cgraph
# Thank you [Enrico Massa](https://github.com/pygraphviz/pygraphviz/issues/100#issuecomment-899253728) for the following solution.
pip3 install pygraphviz --global-option=build_ext --global-option="-I$(brew --prefix)/include" --global-option="-L$(brew --prefix)/lib"
```

## SIP & Ros2 Code
No need to [Disable System Integrity Protection (SIP)](https://docs.ros.org/en/galactic/Installation/Alternatives/macOS-Development-Setup.html#disable-system-integrity-protection-sip)

Follow [Get the ROS 2 code](https://docs.ros.org/en/galactic/Installation/Alternatives/macOS-Development-Setup.html#get-the-ros-2-code)


## Build the ROS 2 code
> Basically follow [Build the ROS 2 code](http://mamykin.com/posts/building-ros2-on-macos-big-sur-m1/) part instead of the official 2-line commands.

So run, (I didn't use `--merge-install`)

```zsh
colcon build \
  --symlink-install \
  --event-handlers console_cohesion+ console_package_list+ \
  --packages-skip-by-dep python_qt_binding \
  --cmake-args \
    --no-warn-unused-cli \
    -DBUILD_TESTING=OFF \
    -DINSTALL_EXAMPLES=ON \
    -DCMAKE_OSX_SYSROOT=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk \
    -DCMAKE_OSX_ARCHITECTURES="arm64" \
    -DCMAKE_PREFIX_PATH=$(brew --prefix):$(brew --prefix qt@5)
  --packages-up-to gazebo_ros_pkgs \
```

> All --cmake-args are necessary to properly build the distro on Big Sur + M1.

And you are not gonna be successful in the first trial. When the error pops. Apply the patches.

The ones I encountered ( in order ) are:
### 1. [mimick_vendor](http://disq.us/p/2j48qop). Thanks [Janin Mai](https://disqus.com/by/janinmai/?)

`src/ros2/mimick_vendor/CMakeLists.txt`:
[Github PR](https://github.com/ros2/mimick_vendor/pull/20)
```diff
include(ExternalProject)
- set(mimick_version "f171450b5ebaa3d2538c762a059dfc6ab7a01039")
+ set(mimick_version "4c742d61d4f47a58492c1afbd825fad1c9e05a09")
externalproject_add(mimick-${mimick_version}
```

### 2. [rviz_ogre_vendor](http://mamykin.com/posts/building-ros2-on-macos-big-sur-m1/). See Patches section.

2.1 On the failure to build `rviz_ogre_vendor`
```bash
Undefined symbols for architecture x86_64:
  "_FT_Done_FreeType", referenced from:
      Ogre::Font::loadResource(Ogre::Resource*) in OgreFont.cpp.o
  "_FT_Init_FreeType", referenced from:
      Ogre::Font::loadResource(Ogre::Resource*) in OgreFont.cpp.o
  "_FT_Load_Char", referenced from:
      Ogre::Font::loadResource(Ogre::Resource*) in OgreFont.cpp.o
  "_FT_New_Memory_Face", referenced from:
      Ogre::Font::loadResource(Ogre::Resource*) in OgreFont.cpp.o
  "_FT_Set_Char_Size", referenced from:
      Ogre::Font::loadResource(Ogre::Resource*) in OgreFont.cpp.o
ld: symbol(s) not found for architecture x86_64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
make[5]: *** [lib/macosx/libOgreOverlay.1.12.1.dylib] Error 1
make[4]: *** [Components/Overlay/CMakeFiles/OgreOverlay.dir/all] Error 2
make[4]: *** Waiting for unfinished jobs....
make[3]: *** [all] Error 2
make[2]: *** [ogre-v1.12.1-prefix/src/ogre-v1.12.1-stamp/ogre-v1.12.1-build] Error 2
make[1]: *** [CMakeFiles/ogre-v1.12.1.dir/all] Error 2
make: *** [all] Error 2
```
patch `src/ros2/rviz/rviz_ogre_vendor/CMakeLists.txt`
```diff
diff --git a/rviz_ogre_vendor/CMakeLists.txt b/rviz_ogre_vendor/CMakeLists.txt
index faac7e1b..c36877c3 100644
--- a/rviz_ogre_vendor/CMakeLists.txt
+++ b/rviz_ogre_vendor/CMakeLists.txt
@@ -120,7 +120,7 @@ macro(build_ogre)
     set(OGRE_CXX_FLAGS "${OGRE_CXX_FLAGS} /w /EHsc")
   elseif(APPLE)
     set(OGRE_CXX_FLAGS "${OGRE_CXX_FLAGS} -std=c++14 -stdlib=libc++ -w")
-    list(APPEND extra_cmake_args "-DCMAKE_OSX_ARCHITECTURES='x86_64'")
+    list(APPEND extra_cmake_args "-DCMAKE_OSX_ARCHITECTURES='arm64'")
   else()  # Linux
     set(OGRE_C_FLAGS "${OGRE_C_FLAGS} -w")
     # include Clang -Wno-everything to disable warnings in that build. GCC doesn't mind it
```
2.2 On another failure to build `rviz_ogre_vendor`
```bash
In file included from /Users/kmamykin/Projects/ros2-build-on-macOS/ros2_galactic/build/rviz_ogre_vendor/ogre-v1.12.1-prefix/src/ogre-v1.12.1/OgreMain/src/OgreOptimisedUtilSSE.cpp:36:
In file included from /Users/kmamykin/Projects/ros2-build-on-macOS/ros2_galactic/build/rviz_ogre_vendor/ogre-v1.12.1-prefix/src/ogre-v1.12.1/OgreMain/src/OgreSIMDHelper.h:69:
In file included from /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/lib/clang/12.0.5/include/xmmintrin.h:13:
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/lib/clang/12.0.5/include/mmintrin.h:33:5: error: use of undeclared identifier '__builtin_ia32_emms'; did you mean '__builtin_isless'?
    __builtin_ia32_emms();
    ^
/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX11.3.sdk/usr/include/c++/v1/math.h:649:12: note: '__builtin_isless' declared here
    return isless(__lcpp_x, __lcpp_y);
           ^
/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX11.3.sdk/usr/include/math.h:545:22: note: expanded from macro 'isless'
#define isless(x, y) __builtin_isless((x),(y))
                     ^
```

update `build/rviz_ogre_vendor/ogre-v1.12.1-prefix/src/ogre-v1.12.1/OgreMain/include/OgrePlatformInformation.h` **(which is downloaded during the build, so you need to try building rviz_ogre_vendor at least once)**.

> [yvbakker](http://disq.us/p/2hez83q) Suggested that "if you supplement the pragma-patch.patch in src/ros2/rviz/rviz_ogre_vendor with the patch given in "On another failure to build rviz_ogre_vendor", you can patch this automatically and it won't be gone when you accidentally delete the build folder"

```diff
--- build/rviz_ogre_vendor/ogre-v1.12.1-prefix/src/ogre-v1.12.1/OgreMain/include/OgrePlatformInformation.h.orig	2021-06-02 16:28:58.000000000 -0400
+++ build/rviz_ogre_vendor/ogre-v1.12.1-prefix/src/ogre-v1.12.1/OgreMain/include/OgrePlatformInformation.h	2021-06-02 16:30:50.000000000 -0400
@@ -50,11 +50,11 @@
 #   define OGRE_CPU OGRE_CPU_X86

 #elif OGRE_PLATFORM == OGRE_PLATFORM_APPLE && defined(__BIG_ENDIAN__)
 #   define OGRE_CPU OGRE_CPU_PPC
 #elif OGRE_PLATFORM == OGRE_PLATFORM_APPLE
-#   define OGRE_CPU OGRE_CPU_X86
+#   define OGRE_CPU OGRE_CPU_ARM
 #elif OGRE_PLATFORM == OGRE_PLATFORM_APPLE_IOS && (defined(__i386__) || defined(__x86_64__))
 #   define OGRE_CPU OGRE_CPU_X86
 #elif defined(__arm__) || defined(_M_ARM) || defined(__arm64__) || defined(__aarch64__)
 #   define OGRE_CPU OGRE_CPU_ARM
 #elif defined(__mips64) || defined(__mips64_)
```


### 3. [rviz_rendering](https://github.com/ros2/ros2/issues/1222#issuecomment-994207211). Thanks [XuShaohua](https://github.com/XuShaohua)

> This cmake file is located at `~/ros2_galactic/src/ros2/rviz/rviz_assimp_vendor/rviz_assimp_vendor-extras.cmake.in`

In assimp-5.1.0/assimpConfig.cmake, ASSIMP_LIBRARY_DIRS variable is reset to empty (see https://github.com/assimp/assimp/blob/master/cmake-modules/assimp-plain-config.cmake.in).
While `rviz/rviz_assimp_vendor/rviz_assimp_vendor-extras.cmake.in` depends on this variable to find assimp library.

Fix this issue quickly, by modifying `rviz_assimp_vendor-extras.cmake.in`:
```diff
diff --git a/rviz_assimp_vendor/rviz_assimp_vendor-extras.cmake.in b/rviz_assimp_vendor/rviz_assimp_vendor-extras.cmake.in
index 8e41fe66..929f659c 100644
--- a/rviz_assimp_vendor/rviz_assimp_vendor-extras.cmake.in
+++ b/rviz_assimp_vendor/rviz_assimp_vendor-extras.cmake.in
@@ -25,7 +25,7 @@ foreach(library IN LISTS ASSIMP_LIBRARIES)
   if(IS_ABSOLUTE "${library}")
     list(APPEND rviz_assimp_vendor_LIBRARIES "${library}")
   else()
-    find_library(library_abs ${library} PATHS "${ASSIMP_LIBRARY_DIRS}" NO_DEFAULT_PATH)
+    find_library(library_abs assimp)
     list(APPEND rviz_assimp_vendor_LIBRARIES "${library_abs}")
   endif()
 endforeach()
 ```
Or replace `find_library()` command:
```diff
diff --git a/rviz_assimp_vendor/rviz_assimp_vendor-extras.cmake.in b/rviz_assimp_vendor/rviz_assimp_vendor-extras.cmake.in
index 8e41fe66..abd7bedc 100644
--- a/rviz_assimp_vendor/rviz_assimp_vendor-extras.cmake.in
+++ b/rviz_assimp_vendor/rviz_assimp_vendor-extras.cmake.in
@@ -25,8 +25,8 @@ foreach(library IN LISTS ASSIMP_LIBRARIES)
   if(IS_ABSOLUTE "${library}")
     list(APPEND rviz_assimp_vendor_LIBRARIES "${library}")
   else()
-    find_library(library_abs ${library} PATHS "${ASSIMP_LIBRARY_DIRS}" NO_DEFAULT_PATH)
-    list(APPEND rviz_assimp_vendor_LIBRARIES "${library_abs}")
+    get_target_property(rviz_assimp_vendor_LIBRARY ${library} IMPORTED_LOCATION_NONE)
+    list(APPEND rviz_assimp_vendor_LIBRARIES "${rviz_assimp_vendor_LIBRARY}")
   endif()
 endforeach()
 set(rviz_assimp_vendor_LIBRARY_DIRS ${ASSIMP_LIBRARY_DIRS})
```

[Build fails on macOS if qt6 is installed](https://github.com/nextcloud/desktop/issues/4365)
```sh
brew remove qt6
```

## Environment setup and Testing
```bash
chmod 777 ./install/*.sh
source ./install/setup.sh
./install/rviz2/bin/rviz2 # testing rviz2 for example
```
## Results with joy
![](images/env_ros.png)

Okey, that's another week of my life gone :)

Cheers.