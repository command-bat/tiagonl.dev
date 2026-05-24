export default function splitProjects(
    projects,
    maxPerRow = 12
) {
    if (projects.length <= maxPerRow) {
        return [projects]
    }

    const rows = Math.ceil(
        projects.length / maxPerRow
    )

    const balanced = Array.from(
        { length: rows },
        () => []
    )

    projects.forEach((project, index) => {
        balanced[index % rows].push(project)
    })

    return balanced
}