import axios from "axios"

export const getAllFormOfUser = async (id) => {
    try {
        const { data } = await axios.get(`/form/${id}`)
        return data
    } catch (error) {
        console.log(error.message)
    }
}