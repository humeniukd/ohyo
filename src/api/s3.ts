import { PresignedPostData } from 'types'

export const uploadFileToS3 = (postData: PresignedPostData, file: File, progress: (n: number) => void) =>
    new Promise((resolve, reject) => {
  const formData = new FormData()
  Object.keys(postData.fields).forEach(key => {
    formData.append(key, postData.fields[key])
  })

  formData.append('file', file)

  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    this.status === 204 ? resolve() : reject(this.responseText);
  };
  xhr.upload.onprogress = function(event) {
    progress(Math.round(event.loaded/event.total*100))
  }
  xhr.open('POST', postData.url, true);
  xhr.send(formData);
})