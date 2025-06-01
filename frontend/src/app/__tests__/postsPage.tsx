const mockData = [
  { id: "1", title: "記事1", url: "https://test1", private: false },
  { id: "2", title: "記事2", url: "https://test2", private: true },
];

const dataResponse = () =>
  Promise.resolve({ ok: true, status: 200, statusText: "ok", json: () => Promise.resolve(mockData) });
global.fetch = jest.fn().mockImplementation(dataResponse);
