import { formatDistance } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function formatDistanceDate(date: Date) {
  return formatDistance(new Date(date), new Date(), {
    locale: ptBR,
    addSuffix: true,
  })
}
