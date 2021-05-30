import { writable, derived } from 'svelte/store'

export const user = writable(null)
export const profesores = writable([])
export const sortedProfesores = derived(profesores, (nombre) => nombre.sort((a, b) => b.date - a.date))
export const balance = derived(profesores, (nombre) => nombre.reduce((acc, t) => acc + t.nombre, 0))
export const income = derived(profesores, (nombre) =>
    nombre.filter((t) => t.nombre > 0).reduce((acc, t) => acc + t.nombre, 0)
)
export const expenses = derived(profesores, (nombre) =>
    nombre.filter((t) => t.nombre < 0).reduce((acc, t) => acc + t.nombre, 0)
)
