import type { HttpContext } from '@adonisjs/core/http'

import Ticket from '#models/ticket'

export default class TicketsController {
  // Menampilkan daftar tiket
  async index() {
    const tickets = await Ticket.query().select('id', 'tipebus', 'penumpang', 'harga', 'tanggal', 'kursi', 'tujuan', 'keberangkatan', 'status')

    return {
      message: 'success get all tickets',
      data: tickets,
    }
  }

  // Menyimpan tiket baru
  async store({ request }: HttpContext) {
    const data = request.body()

    const newTicket = await Ticket.create({
      penumpang: data.penumpang,
      harga: data.harga,
      tanggal: data.tanggal,
      kursi: data.kursi,
      keberangkatan: data.keberangkatan,
      tujuan: data.tujuan,
      tipebus: data.tipebus,
      status: 'pending', // default status
    })

    return {
      message: 'Success create ticket',
      data: newTicket,
    }
  }

  // Menampilkan detail tiket berdasarkan id
  async show({ params }: HttpContext) {
    const id = params.id
    const ticket = await Ticket.find(id)

    return {
      message: 'success get detail ticket',
      data: ticket,
    }
  }

  // Mengupdate tiket berdasarkan id
  async update({ params, request }: HttpContext) {
    const id = params.id
    const data = request.body()

    const ticket = await Ticket.findOrFail(id)

    await ticket
      .merge({
        penumpang: data.penumpang,
        harga: data.harga,
        tanggal: data.tanggal,
        kursi: data.kursi,
        keberangkatan: data.keberangkatan,
        tujuan: data.tujuan,
        tipebus: data.tipebus,
        status: data.status ?? ticket.status, // update status jika ada
      })
      .save()

    return {
      message: 'success update ticket',
      data: ticket,
    }
  }

  // Menghapus tiket berdasarkan id
  async destroy({ params }: HttpContext) {
    const id = params.id

    const ticket = await Ticket.findOrFail(id)

    await ticket.delete()

    return {
      message: 'success delete ticket',
    }
  }
}
