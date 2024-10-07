import { withAuth } from "next-auth/middleware"

export default withAuth(

  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
    secret: process.env.SECRET_KEY,
  },
)

export const config = { matcher: ["/admin", "/update-product/:path*"] }
