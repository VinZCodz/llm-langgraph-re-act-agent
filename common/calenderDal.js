const today = new Date();
let tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

let calenderEvents = [
    {
        date: today.toISOString().split('T')[0],
        subject: "ReAct Agent brainstorming session",
        description: "All cool things about ReAct agents and its kind."
    },
    {
        date: tomorrow.toISOString().split('T')[0],
        subject: "ML brainstorming session",
        description: "All cool things about ML and its kind."
    },
];

const getCalenderEventsByDate = (date) => {
    return calenderEvents.filter(_ => _.date === date);
}

const getCalenderEventsBySubject = (likeSubject) => {
    return calenderEvents.filter(_ => _.subject.includes(likeSubject));
}

const createCalenderEvent = (calenderEvent) => {
    calenderEvents.push(calenderEvent);
}

//Since not indexed will filter and update.
const updateCalenderEvent = (calenderEvent, newDate) => {
    calenderEvents.find(_ => _.date === calenderEvent.date && _.subject === calenderEvent.subject).date = newDate;
}

//Since not indexed will filter and delete.
const deleteCalenderEvent = (calenderEvent) => {
    calenderEvents = calenderEvents.filter(_ => _.date !== calenderEvent.date && _.subject !== calenderEvent.subject);
}

export {
    getCalenderEventsByDate,
    getCalenderEventsBySubject,
    createCalenderEvent,
    updateCalenderEvent,
    deleteCalenderEvent,
}