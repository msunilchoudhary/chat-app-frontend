import React from 'react'
import MessageListItem from './MessageListItem'

function MessageLists() {
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-[#efeae2]">
        <MessageListItem msg="Hello 👋" mine={false} />
        <MessageListItem msg="Hi! How can I help?" mine={true} />        
    </div>
  )
}

export default MessageLists