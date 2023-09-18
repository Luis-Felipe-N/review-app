'use client'

import { Comment, Review } from '@/@types'
import { apiClient } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'
import { Skeleton } from '../../ui/skeleton'
import { Textarea } from '../../ui/textarea'
import { useToast } from '../../ui/use-toast'
import { CommentItem } from './CommentItem'

interface CommentsProps {
  review: Review
}

const commentFormShema = z.object({
  content: z.string(),
})

type CommentFormData = z.infer<typeof commentFormShema>

export function Comments({ review }: CommentsProps) {
  const session = useSession()
  const { toast } = useToast()

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentFormShema),
  })

  const {
    data: comments,
    isFetching: isFetchingComments,
    isLoading: isLoadingComments,
    refetch,
  } = useQuery<Comment[]>(['comments'], async (): Promise<Comment[]> => {
    const response = await apiClient.get(`/review/${review.id}/comment`)
    return response.data.comments
  })

  async function handleCreateComment(commentData: CommentFormData) {
    if (session.status === 'authenticated') {
      try {
        const { data } = await apiClient.post(`/review/${review.id}/comment`, {
          ...commentData,
          userId: session.data.user.id,
        })

        refetch()
        setValue('content', '')
      } catch (error) {
        toast({
          title: 'Erro ao adicionar comentário',
          description: 'Não foi possível adicionar um comentário',
        })
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro ao adicionar comentário',
        description: 'Faça login para conseguir adicionar um comentário.',
      })
    }
  }

  const content = watch('content')

  return (
    <Card className=" bg-zinc-900 rounded-xl">
      <CardContent className="pt-5">
        <form onSubmit={handleSubmit(handleCreateComment)}>
          <label className="space-y-2">
            <strong>Deixe seu feedback</strong>
            <Textarea
              className="h-12 px-4"
              placeholder="Diga o que achou do produto"
              {...register('content')}
            />
            {isSubmitting ? (
              <Button type="submit" className="ml-auto">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publicando
              </Button>
            ) : (
              <Button disabled={!content} type="submit" className="ml-auto">
                Publicar
              </Button>
            )}
          </label>
        </form>
        <ul className="mt-8 animate-accordion-down">
          {isFetchingComments && (
            <div className="flex justify-center mb-8">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            </div>
          )}

          {isLoadingComments ? (
            review.comments.map((comment) => (
              <div key={comment.id} className="flex gap-2 items-start">
                <Skeleton className="h-12 w-12 rounded" />
                <div className="flex-1">
                  <Skeleton className="h-32 w-full rounded" />
                </div>
              </div>
            ))
          ) : comments && comments.length > 0 ? (
            <ScrollArea className="h-max space-y-4" scrollHideDelay={0}>
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </ScrollArea>
          ) : (
            <p className="text-center">Sem comentários</p>
          )}
        </ul>
      </CardContent>
    </Card>
  )
}
