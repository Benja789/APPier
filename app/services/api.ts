import axios from "axios"
import { ApiGetInterface, ApiPostInterface, ReturnApiInterface } from "../interfaces/IApi"

// Metodo get para obtener los datos mediante una consulta
export const apiGetData = async( data: ApiGetInterface ): Promise<ReturnApiInterface> => {
    let responseRequest: ReturnApiInterface = {
        error: true,
        data: [],
        errorDescription: null
    }
    if ( data.setLoader ) data.setLoader(true)

    responseRequest.data = await axios.get(
        data.url, 
        { 
            headers: data.headers, 
            signal: data.signal,
            params: data.params
        } ).then((res)=>{
        responseRequest.error = false
        return res.data
    }).catch((error) => {
        responseRequest.error = (error?.name !== "AbortError" && error?.name !== "CanceledError") 
        responseRequest.message = error?.response?.data?.message 
        responseRequest.errorDescription = error
        return error.response?.data ?? []
    }).finally(()=> {
        if ( data.hasOwnProperty("loader") ) responseRequest.loader = false
        if ( data.setLoader ) data.setLoader(false)
    })
    return responseRequest
}

export const apiPostData = async( data: ApiPostInterface ): Promise<ReturnApiInterface> => {
    let responseRequest: ReturnApiInterface = {
        error: true,
        data: [],
        errorDescription: null
    }
    if ( data.setLoader ) data.setLoader(true)

    responseRequest.data = await axios.post(data.url, data.body, { headers: data.headers }).then((res)=>{
        responseRequest.error = false
        return res.data
    }).catch((error) => {
        responseRequest.error = true
        responseRequest.message = error?.response?.data?.message 
        responseRequest.errorDescription = error
        return error.response?.data ?? []
    }).finally(()=> {
        if ( data.setLoader ) data.setLoader(false)
    })
    return responseRequest
}