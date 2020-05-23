#!/usr/bin/env bash
set -e

pushd () {
    command pushd "$@" > /dev/null
}

popd () {
    command popd "$@" > /dev/null
}

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd "${DIR}"

npm run build

pushd dist

# required for custom domain at github pages
echo 'oj.xrvitd.com' > CNAME
# hack on github page
cp index.html 404.html

git init
git add -A
git commit -m 'deploy'

# publish to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# publish to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/SDUOJ/sduoj-web.git master:gh-pages

popd
popd