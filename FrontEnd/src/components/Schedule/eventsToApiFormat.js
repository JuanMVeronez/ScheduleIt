export default function formatEvent(getId, {
    startDate,
    endDate,
    allDay,
    members,
    eventType,
    title,
    rRule,
    moreDetails
}) {
    return {
        id: getId(),
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
        allDay,
        moreDetails,
        members,
        eventType,
        title,
        rRule,
    }
}