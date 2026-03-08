import { Text, Caption } from '@telegram-apps/telegram-ui'
import { Message as MessageType } from '../types'
import './Message.css'

interface MessageProps {
  message: MessageType
  isOwn: boolean
  senderName?: string
  showAvatar?: boolean
  replyMessage?: MessageType
}

export default function Message({ message, isOwn, senderName, showAvatar, replyMessage }: MessageProps) {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={`message-wrapper ${isOwn ? 'message-own' : 'message-other'}`}>
      {showAvatar && !isOwn && (
        <div className="message-avatar">
          <div className="message-avatar-placeholder">
            {senderName?.[0] || '?'}
          </div>
        </div>
      )}

      <div className="message-content-wrapper">
        {!isOwn && senderName && (
          <Caption level="1" className="message-sender-name">
            {senderName}
          </Caption>
        )}

        <div className={`message-bubble ${isOwn ? 'message-bubble-own' : 'message-bubble-other'}`}>
          {/* Reply Preview */}
          {replyMessage && (
            <div className="message-reply">
              <div className="message-reply-bar" />
              <div className="message-reply-content">
                <Caption level="1" className="message-reply-name">
                  {isOwn ? 'Вы' : senderName}
                </Caption>
                <Caption level="2" className="message-reply-text">
                  {replyMessage.text}
                </Caption>
              </div>
            </div>
          )}

          {/* Forwarded From */}
          {message.forwarded && (
            <Caption level="1" className="message-forwarded">
              Переслано от {message.forwarded.fromUserName}
            </Caption>
          )}

          <Text className="message-text">{message.text}</Text>

          <div className="message-footer">
            <Caption level="2" className="message-time">
              {formatTime(message.timestamp)}
              {message.edited && ' (изм.)'}
            </Caption>

            {isOwn && (
              <span className={`message-status ${message.read ? 'message-read' : 'message-sent'}`}>
                ✓✓
              </span>
            )}
          </div>

          {message.reactions && message.reactions.length > 0 && (
            <div className="message-reactions">
              {message.reactions.map((reaction, idx) => (
                <div key={idx} className="message-reaction">
                  <span>{reaction.emoji}</span>
                  <Caption level="2">{reaction.count}</Caption>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
