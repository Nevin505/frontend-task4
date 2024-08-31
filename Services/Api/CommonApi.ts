import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Define the types for the function parameters
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; // Add more HTTP methods as needed
type RequestBody = Record<string, any> | null; // Adjust based on the expected request body structure

// Define the commonAPI function with types
export const commonAPI = async (
    httpMethod: HttpMethod,
    url: string,
    reqBody: RequestBody
): Promise<AxiosResponse<any>> => {
    const reqConfig: AxiosRequestConfig = {
        method: httpMethod,
        url: url,
        data: reqBody,
        headers: { "Content-Type": "application/json" },
    };

    return await axios(reqConfig)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.error('API call failed:', err);
            throw err; // Re-throwing the error to be handled by the caller
        });
};
