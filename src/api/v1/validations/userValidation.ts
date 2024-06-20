//@ts-expect-error
import vine, { errors, SimpleMessagesProvider } from '@vinejs/vine'
import { uniqueRule } from './rules/unique'

export default async function createUserValidation(data: any) {
  const schema = vine.object({
    name: vine.string().minLength(1),
    email: vine.string().email().normalizeEmail({ all_lowercase: true }).use(
      uniqueRule({ table: 'user', column: 'email' })
    ),
    password: vine.string().minLength(1),
    image: vine.string().minLength(1)
  })

  const messages = {
    'required': 'O campo {{ field }} é obrigatório',
    'minLength': 'O campo {{ field }} é obrigatório',
    'email': 'Preencha um email valido',
    'string': 'O campo {{ field }} não é valido',
    'email.unique': 'Este {{ field }} já existe',
  }

  const fields = {
    name: 'Nome',
    email: 'E-mail',
    password: 'Senha',
    image: 'Imagem'
  }

  vine.messagesProvider = new SimpleMessagesProvider(messages, fields)

  try {
    const validator = vine.compile(schema)
    const output = await validator.validate(data)
    return output;
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      throw error;
    }
  }

}

