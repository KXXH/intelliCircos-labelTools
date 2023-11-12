// api.js

import axios from 'axios'

let apiClient = null

export function setApiClient(newApiClientOpts) {
  apiClient = axios.create(newApiClientOpts)
}

export async function getImages() {
  const resp = await apiClient.get('/images')
  return resp.data.map((image, i) => ({ id: i, ...image }))
}

export async function getImageTag(imageId) {
  const resp = await apiClient.get(`/tags/${imageId}`)
  return resp.data.tag
}

export async function saveImageTag(imageId, tag) {
  const payload = { tag }
  await apiClient.post(`/tags/${imageId}`, payload)
}
