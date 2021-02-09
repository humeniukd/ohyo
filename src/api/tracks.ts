import axios from 'axios'
import {Track} from "../types";

export const resolve = (permalink: string) =>
    axios.get('resolve', {params: { permalink }})


export const track = (track: Track) =>
    axios.put('tracks', track)