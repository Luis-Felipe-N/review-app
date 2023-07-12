import { Post } from '@/components/Post'

export default function Home() {
  return (
    <main className="flex container mx-auto min-h-screen flex-col items-center justify-between p-24">
      <section className="flex flex-1 w-3/4 flex-col gap-4">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </section>
    </main>
  )
}
