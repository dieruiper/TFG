import { writable, derived } from 'svelte/store'

export const user = writable(null)
export const transactions = writable([])
export const sortedTransactions = derived(transactions, (nombre) => nombre.sort((a, b) => b.date - a.date))
export const balance = derived(transactions, (nombre) => nombre.reduce((acc, t) => acc + t.nombre, 0))
export const income = derived(transactions, (nombre) =>
    nombre.filter((t) => t.nombre > 0).reduce((acc, t) => acc + t.nombre, 0)
)
export const expenses = derived(transactions, (nombre) =>
    nombre.filter((t) => t.nombre < 0).reduce((acc, t) => acc + t.nombre, 0)
)
