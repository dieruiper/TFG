import { writable, derived } from 'svelte/store'

export const userAlum = writable(null)
export const alumnos = writable([])
export const sortedAlumnos = derived(alumnos, (nombre) => nombre.sort((a, b) => b.date - a.date))
export const balance = derived(alumnos, (nombre) => nombre.reduce((acc, t) => acc + t.nombre, 0))
export const income = derived(alumnos, (nombre) =>
    nombre.filter((t) => t.nombre > 0).reduce((acc, t) => acc + t.nombre, 0)
)
export const expenses = derived(alumnos, (nombre) =>
    nombre.filter((t) => t.nombre < 0).reduce((acc, t) => acc + t.nombre, 0)
)
