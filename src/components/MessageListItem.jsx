
function MessageListItem({msg, mine}) {
  return (
    <div className={`mb-3 flex ${mine ? 'justify-end':''}`}>
        <div className={`${mine?"bg-green-200 rounded-tr-none":'bg-white rounded-tl-none'} p-3 rounded-lg max-w-xs shadow`}>
            {msg}            
        </div>
    </div>
  )
}

export default MessageListItem