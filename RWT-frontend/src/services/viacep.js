/**
 * Consulta um CEP na API pública ViaCEP (https://viacep.com.br).
 *
 * Retorna { logradouro, bairro, cidade, uf } ou null quando o CEP não existe.
 * Lança erro se a API estiver fora do ar ou sem internet.
 */
export async function buscarCep(cep, signal) {
  const digitos = cep.replace(/\D/g, '')

  const resposta = await fetch(`https://viacep.com.br/ws/${digitos}/json/`, { signal })
  if (!resposta.ok) throw new Error('ViaCEP respondeu com status ' + resposta.status)

  const dados = await resposta.json()
  if (dados.erro) return null

  return {
    logradouro: dados.logradouro || '',
    bairro: dados.bairro || '',
    cidade: dados.localidade || '',
    uf: dados.uf || '',
  }
}