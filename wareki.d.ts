declare module 'wareki' {
  export default function(
    value?: string | number,
    opts?: {
      unit?: boolean
      newEraEnabled?: boolean
      newEraName?: string
    }
  ): string
}
