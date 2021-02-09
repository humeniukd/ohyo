#!/usr/bin/env bash
# FORMATTED WITH SHFMT (https://github.com/mvdan/sh) UTIL
if [ $# -eq 0 ]; then
  echo "Your command line contains no arguments (use --help to see the list of available)"
  exit 1
fi

INACTIVITY_PERIOD="4 week ago"

function askConfirmation() {
  read -p "Are you sure (y/n)? " -r
  echo

  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
}

function showHelp() {
  echo "sync -- Sync local branches with remote"
  echo "list -- List unused branches"
  echo "remove -- Remove unused branches"
}

function syncBranches() {
  git fetch --prune
}

function listBranches() {
  for branch in $(git branch -r | sed s/origin\\/// | awk "! /master/"); do
    if [[ ! $(git log -1 --since="$INACTIVITY_PERIOD" -s origin/$branch) ]]; then
      echo -e $(git show --format="%cr | %an | " origin/$branch | head -n 1) $branch
    fi
  done
}

function removeBranches() {
  askConfirmation

  for branch in $(git branch -r | sed s/origin\\/// | awk "! /master/"); do
    if [[ ! $(git log -1 --since="$INACTIVITY_PERIOD" -s origin/$branch) ]]; then
      echo "Removing branch: $branch"
      git push origin --delete $branch
    fi
  done
}

while [ $# -gt 0 ]; do
  case "$1" in
  --*)
    case "$1" in
    --help)
      showHelp
      ;;
    --sync)
      syncBranches
      ;;
    --list)
      listBranches
      ;;
    --remove)
      removeBranches
      ;;
    *)
      echo "Unknown command $1"
      exit 1
      ;;
    esac
    ;;
  *)
    echo "Wrong argument $1"
    exit 1
    ;;
  esac

  shift
done
