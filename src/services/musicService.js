import * as httpRequest from '../utils/httpRequest'

// Song
export const top100 = async () => {
    try {
        const response = await httpRequest.get('/top100')
        return response?.data
    } catch (error) {
        console.log(error)
    }
}

export const detailPlaylist = async (id) => {
    try {
        const response = await httpRequest.get('/detailplaylist', {
            params: {
                id,
            },
        })
        return response?.data
    } catch (error) {
        console.log(error)
    }
}

export const song = async (id) => {
    try {
        const response = await httpRequest.get('/song', {
            params: {
                id,
            },
        })
        return response?.data
    } catch (error) {
        console.log(error)
    }
}

export const infoSong = async (id) => {
    try {
        const response = await httpRequest.get('/infosong', {
            params: {
                id,
            },
        })
        return response?.data
    } catch (error) {
        console.log(error)
    }
}

// MV
export const listMV = async (id, page, count) => {
    try {
        const response = await httpRequest.get('/listmv', {
            params: {
                id,
                page,
                count,
            },
        })
        return response?.data
    } catch (error) {
        console.log(error)
    }
}

export const categoryMV = async (id) => {
    try {
        const response = await httpRequest.get('/categorymv', {
            params: {
                id,
            },
        })
        return response?.data
    } catch (error) {
        console.log(error)
    }
}

export const video = async (id) => {
    try {
        const response = await httpRequest.get('/video', {
            params: {
                id,
            },
        })
        return response?.data
    } catch (error) {
        console.log(error)
    }
}
