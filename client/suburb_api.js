export async function fetchSuburbs(postcode) {
  let res = await fetch(`/api/suburbs/${postcode}`);
  let suburbs = await res.json();
  return suburbs;
}
