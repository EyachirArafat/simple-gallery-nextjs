export default async function fetchData() {
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const res = await fetch('http://localhost:10000/mediaData')
        return res.json()
    } catch (error) {
        console.log(error)
    }

}
