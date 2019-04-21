orig_file=$1
echo "Cropping 1280x800 from $orig_file ..."
orig_width=$(identify -format '%w' ${orig_file})
diff_half=$(( ($orig_width - 1280)/2 ))
convert $orig_file -crop 1280x800+${diff_half}+0 $orig_file
