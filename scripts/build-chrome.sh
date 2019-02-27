set -eux

export GENERATE_SOURCEMAP=false
react-scripts build

# only leave woff and woff2 font files
rm build/static/media/fontawesome-webfont.*.{eot,svg,ttf}

cd build && zip -r hitup.zip .
