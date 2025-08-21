import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      role: string
      isAdmin: boolean
      isSuperUser: boolean
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    id: string
    role: string
    isAdmin: boolean
    isSuperUser: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    role: string
    isAdmin: boolean
    isSuperUser: boolean
  }
}
