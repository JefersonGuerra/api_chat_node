//@ts-expect-error
import { FieldContext } from '@vinejs/vine/types'
//@ts-expect-error
import vine from '@vinejs/vine'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Options accepted by the unique rule
 */
type Options = {
    table: string
    column: string
}

/**
 * Implementation
 */
async function unique(
    value: unknown,
    options: Options,
    field: FieldContext
) {
    /**
     * We do not want to deal with non-string
     * values. The "string" rule will handle the
     * the validation.
     */
    if (typeof value !== 'string') {
        return
    }

    const row: any = await prisma.$queryRawUnsafe(`SELECT ${options.column} FROM public.${options.table} where ${options.column} = '${value}'`)

    if (row.length >= 1) {
        field.report(
            'The {{ field }} field is not unique',
            'unique',
            field
        )
    }
}

/**
 * Converting a function to a VineJS rule
 */
export const uniqueRule = vine.createRule(unique)