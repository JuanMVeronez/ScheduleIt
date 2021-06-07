export function formatEvent(id, {
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
        id,
        event: {
            startDate: startDate ? startDate.getTime() : startDate,
            endDate: endDate ? endDate.getTime() : endDate,
            allDay,
            moreDetails,
            members,
            eventType,
            title,
            rRule,
        }
    }
}