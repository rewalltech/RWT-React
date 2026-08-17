/**
 * Formata um telefone brasileiro enquanto a pessoa digita:
 * - remove qualquer caractere que não seja número
 * - limita a 11 dígitos (2 do DDD + até 9 do número)
 * - aplica a máscara (DD) NNNNN-NNNN (ou (DD) NNNN-NNNN para fixo, 10 dígitos)
 */
export function formatarTelefone(valor) {
  const digitos = valor.replace(/\D/g, '').slice(0, 11)

  if (digitos.length === 0) return ''
  if (digitos.length <= 2) return `(${digitos}`
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`
  if (digitos.length <= 10) return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`
}

/** E-mail simples: exige algo antes e depois do @, com um domínio (ponto). */
export function emailValido(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())
}