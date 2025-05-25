import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Bus from './bus.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare penumpang: string

  @column()
  declare harga: number

  @column()
  declare tujuan: string

  @column()
  declare keberangkatan: string

  @column()
  declare tipebus: string

  @column()
  declare kursi: number

  @column.date()
  declare tanggal: DateTime
  
  @column()
  declare status: string  // tambah kolom status

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime


  @belongsTo(() => Bus)
  declare bus: BelongsTo<typeof Bus>

}
