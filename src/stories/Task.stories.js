// task stories definition
import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import Task from '../Task';

export default {
    component: Task,
    title: 'Task',
    decorators: [withKnobs],
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/
};

export const taskData = {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const actionsData = {
    onPinTask: action('onPinTask'),
    onArchiveTask: action('onArchiveTask'),
};

// default task story
export const Default = () => (<Task task={object('task', { ...taskData })} {...actionsData} />);

// pinned task story
export const Pinned = () => (<Task task={{ ...taskData, state: 'TASK_PINNED' }} {...actionsData} />);

// archived task story
export const Archived = () => (
    <Task task={{ ...taskData, state: 'TASK_ARCHIVED' }} {...actionsData} />
);

// task with huge title story
const longTitleString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scaevola tribunus plebis ferret ad plebem vellentne de ea re quaeri. Quodsi ipsam honestatem undique pertectam atque absolutam. Sic consequentibus vestris sublatis prima tolluntur. Igitur ne dolorem quidem. Istam voluptatem perpetuam quis potest praestare sapienti? Duo Reges: constructio interrete.Nos quidem Virtutes sic natae sumus, ut tibi serviremus, aliud negotii nihil habemus. Hoc non est positum in nostra actione. Qua ex cognitione facilior facta est investigatio rerum occultissimarum. Qui autem de summo bono dissentit de tota philosophiae ratione dissentit. Primum divisit ineleganter; Etsi ea quidem, quae adhuc dixisti, quamvis ad aetatem recte isto modo dicerentur.";
export const LongTitle = () => (
    <Task task={{ ...taskData, title: longTitleString }} {...actionsData} />
);