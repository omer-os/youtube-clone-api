export const serializeDates = <T extends Record<string, any>>(obj: T) => {
  const result = { ...obj }
  for (const key in result) {
    // @ts-ignore
    if (result[key] instanceof Date) {
      ; (result as any)[key] = (result[key] as Date).toISOString()
    }
  }
  return result as { [K in keyof T]: T[K] extends Date ? string : T[K] }
}
