export async function asyncHandler<T>(asyncRequest: () => T): Promise<T | undefined> {
  try {
    const response = await asyncRequest();
    return response;
  } catch (err) {
    console.log(err);
    return;
  }
}