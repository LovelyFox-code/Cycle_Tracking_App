export interface User {
  id: string
  full_name: string | null
  email: string
  dietary_preference: string | null
  theme_preference: string | null
  notifications_enabled: boolean
  created_at: string
}