export async function getProjects() {
    const response = await fetch(
        'https://api.projetos.tiagonl.dev.br/api/github/projects',
        {
            cache: 'no-store',

            headers: {
                Authorization:
                    `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
        }
    )

    return response.json()
}