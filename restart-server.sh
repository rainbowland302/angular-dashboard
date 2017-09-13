read -ra parts <<< $(netstat -nlp | grep 3005)
kill $(sed "s/\([0-9]*\)\/node/\1/" <<< ${parts[6]})
npm run server:node
