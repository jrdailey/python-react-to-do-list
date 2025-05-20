import '@testing-library/jest-dom'

export const mockFetch = vi.fn()

vi.stubGlobal('fetch', mockFetch)
