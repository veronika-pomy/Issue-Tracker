'use client';

import { Select } from '@radix-ui/themes';
import React from 'react';

const AssignUser = () => {
  return (
    <Select.Root>
        <Select.Trigger placeholder='Assign Issue'/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Users</Select.Label>
                <Select.Item value="1">Veronika Pomyateeva</Select.Item>
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AssignUser;