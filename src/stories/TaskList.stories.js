// taskList stories definition
import React from 'react';
import { PureTaskList } from '../TaskList';
import { taskData, actionsData } from './Task.stories';

export default {
    component: PureTaskList,
    title: 'TaskList',
    // decorators are a way to provide arbitrary wrappers to stories.
    decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
    excludeStories: /.*Data$/
};

export const defaultTaskData = [
    { ...taskData, id: '1', title: 'Task 1' },
    { ...taskData, id: '2', title: 'Task 2' },
    { ...taskData, id: '3', title: 'Task 3' },
    { ...taskData, id: '4', title: 'Task 4' },
    { ...taskData, id: '5', title: 'Task 5' },
    { ...taskData, id: '6', title: 'Task 6' }
];

export const withPinnedTasksData = [
    ...defaultTaskData.slice(0, 5),
    { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' }
];

// default task list story
export const Default = () => <PureTaskList tasks={defaultTaskData} {...actionsData} />;

// list with pinned tasks story
export const WithPinnedTasks = () => <PureTaskList tasks={withPinnedTasksData} {...actionsData} />

// loading task list story
export const Loading = () => <PureTaskList loading tasks={[]} {...actionsData} />

// empty task list story
export const Empty = () => <PureTaskList tasks={[]} {...actionsData} />