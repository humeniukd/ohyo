import axios from 'axios'

export const signOut = () => axios.post('/signout')
