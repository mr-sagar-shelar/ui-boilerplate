import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://api.github.com/repos/TanStack/query', () => {
    return HttpResponse.json({
      name: 'Mocked TanStack Query',
      description: 'A mocked description for the test.',
      subscribers_count: 999,
      stargazers_count: 12345,
      forks_count: 543,
    })
  }),
]
