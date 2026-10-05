import Medusa from "@medusajs/js-sdk"

let MEDUSA_BACKEND_URL = "http://localhost:9000"

// if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
//   MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
// }

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: 'pk_b61848b693922e5d789383a4105fc6b6e8a1dd4f9ba6a566969609d8a5ec63b8',
})