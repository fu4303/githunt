set -eu

version=$1

sed -i -re "s/REACT_APP_VERSION=.+/REACT_APP_VERSION=${version}/" .env
sed -i -re "s/\"version\": \".+\"/\"version\": \"${version}\"/" package.json
sed -i -re "s/\"version\": \".+\"/\"version\": \"${version}\"/" public/manifest.json
sed -i -re "s/var appVer = \".+\"/var appVer = \"${version}\"/" public/ga.js

echo "After you commit changes, don't forget: git tag ${version}"
