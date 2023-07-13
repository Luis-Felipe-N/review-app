import { Post } from '@/components/Post'

export default function Home() {
  return (
    <main className="flex container mx-auto min-h-screen flex-col items-center justify-between px-24 py-12">
      <section className="w-full">
        <ul className='flex gap-4'>
          <li>
            <Post />
          </li>
          <li>
            <Post />
          </li>
        </ul>
      </section>
    </main>
  )
}
