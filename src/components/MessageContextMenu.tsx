import { Modal, Button, List, Cell } from '@telegram-apps/telegram-ui'
import { Message } from '../types'
import './MessageContextMenu.css'

interface MessageContextMenuProps {
  isOpen: boolean
  onClose: () => void
  message: Message
  isOwn: boolean
  onReply: () => void
  onEdit?: () => void
  onDelete: () => void
  onForward: () => void
  onCopy: () => void
}

export default function MessageContextMenu({
  isOpen,
  onClose,
  isOwn,
  onReply,
  onEdit,
  onDelete,
  onForward,
  onCopy,
}: MessageContextMenuProps) {
  const handleAction = (action: () => void) => {
    action()
    onClose()
  }

  return (
    <Modal
      open={isOpen}
      onOpenChange={onClose}
      header={<Modal.Header>Действия</Modal.Header>}
    >
      <List className="message-context-menu">
        <Cell
          Component="button"
          onClick={() => handleAction(onReply)}
          before={<span>💬</span>}
        >
          Ответить
        </Cell>

        {isOwn && onEdit && (
          <Cell
            Component="button"
            onClick={() => handleAction(onEdit)}
            before={<span>✏️</span>}
          >
            Редактировать
          </Cell>
        )}

        <Cell
          Component="button"
          onClick={() => handleAction(onCopy)}
          before={<span>📋</span>}
        >
          Копировать
        </Cell>

        <Cell
          Component="button"
          onClick={() => handleAction(onForward)}
          before={<span>↗️</span>}
        >
          Переслать
        </Cell>

        {isOwn && (
          <Cell
            Component="button"
            onClick={() => handleAction(onDelete)}
            before={<span>🗑️</span>}
            className="message-context-menu-delete"
          >
            Удалить
          </Cell>
        )}

        <Modal.Close>
          <Button mode="plain" stretched>
            Отмена
          </Button>
        </Modal.Close>
      </List>
    </Modal>
  )
}
