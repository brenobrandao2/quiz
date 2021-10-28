import { base_url_db } from "../utils/baseUrls"

export const getLists = async (apiUrl, token) => {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiUrl, token })
    }
    
    let allLists
    try {
        allLists = await fetch(`${base_url_db}/ac/getLists`, opt).then(response => response.json())
    } catch (error) {
        console.log('Falha ao carregar listas')
    }

    return allLists?.lists && allLists.lists.length > 0 ? allLists.lists : []
}