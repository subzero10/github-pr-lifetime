# Github PR Lifetime Report

## What is this?

This is a script that reads the last 500 (`PR_FETCH_COUNT`) PRs. It filters out PRs that are older than a set filter date (`PR_FILTER_DATE`)
and prints out:
- a table with the lifetime of each merged PR. The table is sorted by the `lifetime_days` in descending order.
- a mean value
- a median value

This data can help you decide whether your team can make the jump to Trunk-based Development.
TBD's main feature is short-lived branches and if you can't get that to work, then you will quickly see it fail.
If you are not there yet (i.e. your average value is close to a week or ever longer), use this script to keep track of your progress and switch to TBD when you feel ready.
In my experience, a PR lifetime average of < 2 days is a good number to target.  

## Why?

Are you using gitflow?
Are you trying to improve your deployment performance in your team?

If yes, then you should try [trunk based development](https://trunkbaseddevelopment.com/). Gitflow may be slowing you down.

## Prerequisites

- [Github Personal Access Token](https://github.com/settings/tokens) with `repo` scope.

## Run it

1. Create `.env` file from `.env.template`
2. Set `PAT_TOKEN`, `REPO_OWNER`, `REPO_NAME`, `PR_FETCH_COUNT`, `PR_FILTER_DATE`
3. npm install
4. npm start
