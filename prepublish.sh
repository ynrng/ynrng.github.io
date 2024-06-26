#!/bin/bash

dest_dir="./docs"

mkdir -p $dest_dir

pwd

### generate html files from md
search="file:///$(pwd)/"
echo $search
replace="https://github.com/ynrng/ynrng.github.io/blob/master/"

files=$(find $dest_dir -type f -name '*.html')
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

### pure copy src/tex files to destination folder
included_exts="tex bib sty pdf"  # Add the extensions you want to exclude

src_dir="./uob"
for ext in $included_exts; do
    find "$src_dir" -type f -name "*.$ext" | while read -r file; do
        ditto $file "$dest_dir/$(dirname "$file")/$(basename "$file")"
    done
done

cp "CNAME" "$dest_dir/CNAME"
rm -rf "$dest_dir/uob/~"