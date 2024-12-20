const generateExamPlanForInvigilators = (rooms, staff, exam_date) => {
    const allocations = [];

    for (let i = 0; i < rooms.length; i++) {
        allocations.push({
            room: rooms[i],
            staff: staff[i].invg_email,
            date: exam_date,
        });
    }

    return allocations;
}

export default generateExamPlanForInvigilators;