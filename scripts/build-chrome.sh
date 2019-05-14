set -eux

export GENERATE_SOURCEMAP=false
react-scripts build

cd build && zip -r hitup.zip .
