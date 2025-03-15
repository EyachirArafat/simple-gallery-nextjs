export default async function fetchData() {
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const res = await fetch('http://localhost:10000/mediaData')
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        return res.json()
    } catch (error) {
        console.error('Error in fetching data:', error)
    }

}
