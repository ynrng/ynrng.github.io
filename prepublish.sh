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

  SUB='uob/summer'
  if [[ "$file" == *"$SUB"* ]]; then
    sed -i '' 's+<meta name="robots" content="noindex">++g' $file
    sed -i '' 's+<head>+<head>\n<meta name="robots" content="noindex">+g' $file
  fi

done
