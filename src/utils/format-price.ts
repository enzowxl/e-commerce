import { Prisma } from '@prisma/client'

export const formatPrice = (value: number | Prisma.Decimal): string => {
  return `R$ ${Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(Number(value))}`
}
