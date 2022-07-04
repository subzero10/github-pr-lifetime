import 'dotenv/config';
import { Octokit } from '@octokit/rest';
import { report, sortByLifetime } from './report';

const octokit = new Octokit({
  auth: process.env.PAT_TOKEN
});

const PER_PAGE = 100;

function getPrs(page) {
  return octokit.rest.pulls.list({
    owner: process.env.REPO_OWNER,
    repo: process.env.REPO_NAME,
    state: 'closed',
    page,
    per_page: PER_PAGE
  }).then(({data: prs}) => prs);
}

async function goGoGo() {
  const pages = (+process.env.PR_FETCH_COUNT) / PER_PAGE;
  const prs = [];
  for (let page = 1; page <= pages; page++) {
    const prsPerPage = await getPrs(page);
    prs.push(...prsPerPage);
  }
  const sortedPrs = sortByLifetime(prs, new Date(process.env.PR_FILTER_DATE));
  report(sortedPrs);
}

(async () => {
  await goGoGo();
})();




