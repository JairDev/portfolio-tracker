export default async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  options?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, options);
  const data = await res.json();

  return data;
}
