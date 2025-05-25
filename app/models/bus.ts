import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Bus extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare keberangkatan: string

  @column()
  declare tujuan: string

  @column()
  declare waktu: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}