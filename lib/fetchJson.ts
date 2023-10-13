export default async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  options?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, options);
  // if (!res.ok) {
  //   const error = new Error(
  //     `An error occurred while fetching the data: ${res.statusText}`
  //   );
  //   throw error;
  // }

  const data = await res.json();
  return data;
}
