import { expect, test, beforeAll, afterEach, afterAll } from 'vitest'
import { render } from 'vitest-browser-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import ApiExample from './ApiExample'
import { page } from 'vitest/browser'

export const handlers = [
  http.get('https://api.github.com/repos/TanStack/query', () => {
    return HttpResponse.json({
      name: 'Mocked query',
      description: 'Mocked Description',
      subscribers_count: 999,
      stargazers_count: 12345,
      forks_count: 543
    })
  }),
]

const worker = setupWorker(...handlers)

if (import.meta.env.VITE_ENABLE_MOCK === 'true') {
  beforeAll(async () => {
    await worker.start();
  });
  afterEach(async () => {
    await worker.resetHandlers();
  });
  afterAll(async () => {
    await worker.stop();
  });
}

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

test('renders loading state initially', async () => {
  const wrapper = createWrapper()
  await render(<ApiExample />, { wrapper })
  // Loading state is displayed while fetching
  await expect.element(page.getByText('Loading...')).toBeInTheDocument()
})

test('renders successful data', async () => {
  const wrapper = createWrapper()
  await render(<ApiExample />, { wrapper })

  // Wait for the loading to disappear and data to be rendered
  await expect.element(await page.getByText('Mocked query')).toBeInTheDocument()
  await expect.element(page.getByText('Mocked Description')).toBeInTheDocument()
  await expect.element(page.getByText('👀 999')).toBeInTheDocument()
  await expect.element(page.getByText('✨ 12345')).toBeInTheDocument()
  await expect.element(page.getByText('🍴 543')).toBeInTheDocument()
})

test('renders error state', async () => {
  worker.use(
    http.get('https://api.github.com/repos/TanStack/query', () => {
      return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' })
    }),
  )

  const wrapper = createWrapper()
  await render(<ApiExample />, { wrapper })

  // Wait for the loading to disappear and the error message to be rendered
  await expect.element(await page.getByText(/An error has occurred:/)).toBeInTheDocument()
})
