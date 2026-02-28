import axios from 'axios';
import type { JobStatus, ProcessResult } from '../types/types';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

export const processMedia = async (file?: File, url?: string) => {
    const formData = new FormData();
    if (file) formData.append('file', file);
    if (url) formData.append('url', url);

    const response = await apiClient.post<{ job_id: string; status: string; message: string }>('/process', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getJobStatus = async (jobId: string) => {
    const response = await apiClient.get<JobStatus>(`/status/${jobId}`);
    return response.data;
};

export const getResult = async (jobId: string) => {
    const response = await apiClient.get<ProcessResult>(`/result/${jobId}`);
    return response.data;
};

export const askQuestion = async (jobId: string, question: string, history?: { q: string, a: string }[]) => {
    const response = await apiClient.post<{ answer: string }>('/ask', {
        job_id: jobId,
        question,
        history: history || [],
    });
    return response.data;
};
