import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface PredictionResponse {
  prediction: 'Normal' | 'Pneumonia'
  confidence: number
  raw_score: number
  disclaimer: string
}

export interface ModelInfo {
  model_type: string
  framework: string
  input_size: [number, number]
  classes: string[]
  accuracy: string
  threshold: number
}

export const predictPneumonia = async (file: File): Promise<PredictionResponse> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post<PredictionResponse>('/api/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const getModelInfo = async (): Promise<ModelInfo> => {
  const response = await api.get<ModelInfo>('/api/model/info')
  return response.data
}

export const checkHealth = async (): Promise<{ status: string }> => {
  const response = await api.get<{ status: string }>('/health')
  return response.data
}
