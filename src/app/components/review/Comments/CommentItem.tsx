import { Comment, Review } from '@/@types'
import { formatDistanceDate } from '@/lib/utils'
import { Trash } from '@phosphor-icons/react'
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar'
import { Button } from '../../ui/button'
import { Card, CardHeader, CardContent } from '../../ui/card'
import { toast, useToast } from '../../ui/use-toast'

interface CommentItemProps {
  comment: Comment
}

export function CommentItem({ comment }: CommentItemProps) {
  const { toast } = useToast()

  function handleDeleteComment(commentId: string) {
    try {
      toast({
        title: "Remover comentário",
        description: 'Comentário removido com sucesso',
      })
    } catch (error) {
      toast({
        title: "Erro ao adicionar comentário",
        description: 'Não foi possível adicionar um comentário',
        variant: 'destructive'
      })
    }
  }

  return (
    <li className="flex items-start gap-2">
      <div className="bg-zinc-800 p-1 rounded-lg">
        <Avatar className="w-10 h-10">
          <AvatarImage src={comment.user.avatar_url} />
          <AvatarFallback>{comment.user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </div>
      <Card className="bg-zinc-800 rounded-xl flex-1">
        <CardHeader className="flex-row items-start justify-between gap-2 p-4 pb-0">
          <div className="flex flex-col">
            <strong className="text-sm">{comment.user.username}</strong>
            <small className="text-zinc-400 text-xs">
              {formatDistanceDate(comment.created_at)}
            </small>
          </div>

          <Button variant="ghost" title='Remover comentário' onClick={() => handleDeleteComment(comment.id)} className='p-1 hover:text-red-400'>
            <Trash />
          </Button>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-zinc-200 w-100">{comment.content}</p>
        </CardContent>
      </Card>
    </li>
  )
}
