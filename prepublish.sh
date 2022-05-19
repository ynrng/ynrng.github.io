#!/bin/bash

foldername="docs"

search="file:////Users/wendy/code/projects/sugaE.github.io/"
replace="https://github.com/sugaE/sugaE.github.io/blob/master/"

files=$(find $foldername -type f -name '*.html')
for file in ${files[*]}
do
  echo $file
  sed -i '' "s+$search+$replace+g" $file
  sed -i '' 's+.png"+.png?raw=true"+g' $file
done
