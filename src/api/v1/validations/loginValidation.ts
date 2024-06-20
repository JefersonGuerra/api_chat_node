//@ts-expect-error
import vine, { errors, SimpleMessagesProvider } from '@vinejs/vine'

export default async function createLoginValidation(data: any) {
  const schema = vine.object({
    email: vine.string().email().normalizeEmail({ all_lowercase: true }),
    password: vine.string().minLength(1),
  })

  const messages = {
    'required': 'O campo {{ field }} é obrigatório',
    'minLength': 'O campo {{ field }} é obrigatório',
    'email': 'Preencha um email valido',
    'string': 'O campo {{ field }} não é valido',
  }

  const fields = {
    email: 'E-mail',
    password: 'Senha',
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

