import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';
import React from 'react';

interface Props {
    status: Status;
}

const statusMap: Record<Status, { label: string, color: 'red' | 'yellow' | 'green'}> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In Progress', color: 'yellow' },
    CLOSED: { label: 'Closed', color: 'green' }
}

const StatusBadge = ({ status }: Props ) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}

export default StatusBadge;