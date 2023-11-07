import { createClient } from "@supabase/supabase-js";
import { FC, useState } from "react";
import { useAsync } from "react-use";

const supabase = createClient("https://lpeucqaajeammurxektn.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwZXVjcWFhamVhbW11cnhla3RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzMjMzMjksImV4cCI6MjAxNDg5OTMyOX0.2H5_Kma5z7I2fbs1-SliEokiDKmh4_HoVX-2bf7UcVs");

type Post = {
    id: number;
    text: string;
}

const PostCard: FC<{ post: Post }> = () => {
    const [isLiked, setLiked] = useState(false)

    useAsync(async() => {
        // 
        await supabase.from('likes').dljkfjskdf
        // setState
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
              // add like to local state
              // if this like is for this specifc post then XXX
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
                event: 'DELETE',
                schema: 'public',
                table: 'likes'
            },
            (payload) => {
                // delete like from local state
            }
            )
            .subscribe()
    }, [])

    return (<p>Post Card!!</p>)
}

export default PostCard