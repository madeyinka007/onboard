const baseUrl = "http://localhost:3100/api-gateway"
const uploadUrl = "https://api.cloudinary.com/v1_1/"

export const postData = async (url, data) => {
    const response = await fetch(baseUrl + url, {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    return response.json()
}

export const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', "vc1uadeu")
    const response = await fetch(uploadUrl+'dlkr53z7i/image/upload', {
        method:"POST",
        body: formData
    })
    return response.json()

}
