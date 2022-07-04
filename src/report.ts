import calculateBusinessDays from './calculate-business-days';

export function sortByLifetime(prs: GithubPullRequest[], filterDate: Date) {
  return prs
    .filter(pr => !!pr.merged_at)
    .filter(pr => pr.title.toLowerCase().indexOf('merge') === -1)
    .filter(pr => new Date(pr.created_at).getTime() > filterDate.getTime())
    .map(pr => {
      const createdAt = new Date(pr.created_at).getTime();
      const mergedAt = new Date(pr.merged_at).getTime();
      return {
        number: pr.number,
        title: pr.title,
        created_at: pr.created_at,
        merged_at: pr.merged_at,
        lifetime_days: calculateBusinessDays(createdAt, mergedAt) // (mergedAt - createdAt) / (1000 * 60 * 60 * 24),
      };
    })
    .sort((a,b) => a.lifetime_days > b.lifetime_days ? -1 : 1);
}

export function report(sortedPrs: ({ lifetime_days: number } & Pick<GithubPullRequest, 'number' | 'title' | 'created_at' | 'merged_at'>)[]) {
  const mean = sortedPrs.reduce((prev, cur) => {
    return prev + cur.lifetime_days;
  }, 0) / sortedPrs.length;

  const median = sortedPrs[Math.floor(sortedPrs.length / 2)];

  console.table(sortedPrs.map(pr => {
    return {
      ...pr,
      lifetime_days: parseFloat(pr.lifetime_days.toFixed(2))
    };
  }));

  console.log('Mean', mean);
  console.log('Median', median);
}


type GithubPullRequest = {
    id: number;
    title: string;
    number: number;
    html_url: string;
    created_at: string;
    closed_at: string;
    merged_at?: string;
}
