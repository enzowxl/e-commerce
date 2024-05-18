import {
  LayoutDashboard,
  LayoutList,
  LogIn,
  Package,
  Settings,
  ShoppingBasket,
  StoreIcon,
  UserRoundPlus,
  UsersRound,
} from 'lucide-react'

export const pages = [
  {
    id: 1,
    name: 'Home',
    href: '/',
    icon: StoreIcon,
  },
  {
    id: 2,
    name: 'Dashboard',
    href: '/dashboard/product',
    icon: LayoutDashboard,
    admin: true,
    logged: true,
  },
  {
    id: 3,
    name: 'My orders',
    href: '/orders',
    icon: Package,
    logged: true,
  },
  {
    id: 4,
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    logged: true,
  },
  {
    id: 5,
    name: 'Sign In',
    href: '/signin',
    icon: LogIn,
  },
  {
    id: 6,
    name: 'Sign Up',
    href: '/signup',
    icon: UserRoundPlus,
  },
]

export const dashboardPages = [
  {
    id: 1,
    name: 'Products',
    href: '/dashboard/product',
    icon: ShoppingBasket,
  },
  {
    id: 2,
    name: 'Categories',
    href: '/dashboard/category',
    icon: LayoutList,
  },
  {
    id: 3,
    name: 'Users',
    href: '/dashboard/user',
    icon: UsersRound,
  },
]
