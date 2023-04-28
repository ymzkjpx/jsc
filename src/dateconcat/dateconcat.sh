#!/bin/bash

set -eu

echo -e "与えられた2つの日付からその区間中の連続する日付を出力します"

function valid(){
  if [ $# -ne 2 ]; then
    printHelp
    exit 0
  fi
}

function runexec(){
  echo -e "入力"
  echo -e "${1} 〜 ${2}"
  echo -e ""
  echo -e "出力"

  start_date=$(date -j -f "%Y-%m-%d" "${1}" "+%s")
  end_date=$(date -j -f "%Y-%m-%d" "${2}" "+%s")

  while [ "${start_date}" != "${end_date}" ]
  do
    echo "$(date -j -f "%s" "${start_date}" "+%Y-%m-%d")"
    start_date=$(( start_date + 86400 ))
  done
  echo "$(date -j -f "%s" "${end_date}" "+%Y-%m-%d")"

  exit 0
}

function printHelp(){
  echo -e "入力例"
  echo -e "./dateconcat.sh 2023-03-30 2023-04-02"
  echo -e ""
  echo -e "出力例"
  echo -e "2023-03-30\n2023-31\n2023-04-01\n2023-04-02"
}

function Main(){
  valid "$@"
  runexec "$1" "$2"
}

Main "$@"
