import { useState } from 'react'

import { createClient } from "@supabase/supabase-js";
import { useAsync } from 'react-use';
import PostCard from './components/PostCard';

const supabase = createClient("https://lpeucqaajeammurxektn.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwZXVjcWFhamVhbW11cnhla3RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzMjMzMjksImV4cCI6MjAxNDg5OTMyOX0.2H5_Kma5z7I2fbs1-SliEokiDKmh4_HoVX-2bf7UcVs");

type Post = {
  id: number;
  text: string;
}

type User = {
  id: number,
  name: string
}

function App() {
  const [auth, setAuth] = useState<User | undefined>()
  const [posts, setPosts] = useState<Post[]>([])
  const [text, setText] = useState('')

  useAsync(async () => {
    supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts'
        },
        (payload) => {
          // @ts-expect-error -- hehehe
          setPosts(prev => [...prev, payload.new])
        }
      )
      .subscribe()
  }, [])

  useAsync(async () => {
    supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'likes'
        },
        (payload) => {
          // okay I got a new like let's save it in the local state
        }
      )
      .subscribe()
  }, [])

  useAsync(async () => {
    const { data } = await supabase.from("users").select();
    setAuth(data?.[0])
  }, [])

  useAsync(async () => {
    const { data } = await supabase.from("posts").select();
    // @ts-expect-error -- hehe
    setPosts(data)
  }, [])

  const handleSubmit = async () => {
    if (auth === undefined) throw new Error('User Not Ready')

    await supabase.from('posts').insert({
      text,
      user_id: auth.id
    })

    setText('')
  }

  return (
      <div>
        <input type='text' placeholder='post something' value={text} onChange={e => setText(e.target.value)} />
        <button onClick={handleSubmit}>Post!</button>
    
        {
          posts.map(post => (
           <PostCard post={post} />
          ))
        }
      </div>
  )
}

export default App
