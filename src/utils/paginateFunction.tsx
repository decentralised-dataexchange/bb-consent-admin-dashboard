export function paginate<T>(records: T[], pageSize: number, pageNumber: number): T[] {
    return records.slice(
      (pageNumber - 1) * pageSize,
      pageNumber * pageSize
    );
}