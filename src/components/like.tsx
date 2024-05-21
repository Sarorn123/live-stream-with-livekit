import React from 'react'
import { Button } from './ui/button'
import { ThumbsUp } from 'lucide-react'

type Props = {}

const LikeStream = (props: Props) => {
  return (
        <Button className='flex items-center gap-2 rounded'>
            <ThumbsUp />
            100
        </Button>
  )
}

export default LikeStream