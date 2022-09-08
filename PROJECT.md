# Project

## Requirements

- Check for / setup SSH?
- Install all required dependencies on the Raspberry Pi?
- Transfer specified includes and libs from target Raspberry Pi to host system
    - [Unison][13] for file transfer
    - Integrate with CMake tools / CPP tools for intellisense search paths
    - Cache them, update cache when new includes specified.
    - Add include directories, etc, to CMakeLists.txt
- Cross-compile currently selected CMake preset/config/target and deploy to target Raspberry Pi
    - Run without debugging
        - Ability to attach a debugger to the running process
    - Run with debugging
    - Capture target stdout/stderr to VSCode terminal/output
    - Run X11/DRM windows on target
        - Possibly redirect to host (XMing or similar)
- Specify toolchain location for target
- Transfer of other assets to the Raspberry Pi
    - Images, audio, etc.
- Copy build artifacts to target.
    - Specify where on target.

## Notes

Synchronise specific directories from the Raspberry Pi root filesystem:
- /lib
- /usr/include
- /usr/lib
- /usr/local/include
- /usr/local/lib

Need gdbserver installed on target machine to remote debug.

Needed to install `libbsd-dev`
