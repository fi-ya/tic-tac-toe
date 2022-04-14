import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom'

const server = setupServer(
  rest.get("http://localhost:4567", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({test: 'test'})
    )
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export {server, rest}