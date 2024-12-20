const generateExamPlan = (rooms,
                          totalNoOfStudents,
                          benchCapacity,
                          benchesPerRoom,
                          selectedStudents,
                          no_of_rooms) => {

    let allocations = [];
    let roomIndex = 0,
        benchIndex = 0,
        noOfStudentsAllocated = 0;

    const departmentGroups = {}
    selectedStudents.forEach((student) => {
        if (!departmentGroups[student.dept_id])
            departmentGroups[student.dept_id] = [];
        departmentGroups[student.dept_id].push(student.roll_no);
    })

    while (noOfStudentsAllocated < totalNoOfStudents) {
        const currentRoom = rooms[roomIndex];
        const currentBench = benchIndex + 1;

        // Create a bench allocation
        let bench = [];
        for (const deptId in departmentGroups) {
            if (bench.length < benchCapacity && departmentGroups[deptId].length > 0) {
                bench.push(departmentGroups[deptId].shift()); // Assign one student from this department
                noOfStudentsAllocated += 1;
            }
        }

        // Assign bench to the room
        bench.forEach(rollNo => {
            allocations.push({
                room_no: currentRoom,
                bench_no: currentBench,
                roll_no: rollNo
            });
        });

        // Update indices
        benchIndex += 1;
        if (benchIndex === +benchesPerRoom) {
            benchIndex = 0;
            roomIndex += 1;
            if (roomIndex === no_of_rooms) break; // Stop if all rooms are filled
        }
    }

    return allocations;
}

export default generateExamPlan;