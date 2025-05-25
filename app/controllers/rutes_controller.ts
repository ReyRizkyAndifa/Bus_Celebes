import type { HttpContext } from '@adonisjs/core/http'
// import type { HttpContextContract } from '@ioc:Adonis/Core/Http' // ditambahkan sesuai permintaan
// import RoutingService from 'App/Services/RoutingService.js' // ditambahkan sesuai permintaan
import RoutingService from '#services/RoutingService'

import { config } from 'dotenv'
config()
import fs from 'node:fs'
import path from 'node:path'
import axios from 'axios'

export default class RutesController {
  public async index({ request, response }: HttpContext | HttpContext) {
    const asal = request.input('asal')
    const tujuan = request.input('tujuan')

    if (!asal || !tujuan) {
      return response.status(400).json({ error: 'Asal dan tujuan wajib diisi' })
    }

    const filePath = path.join(process.cwd(), 'public', 'rute', `${asal}_to_${tujuan}.json`)

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8')
      return response.status(200).json(JSON.parse(data))
    }

    const koordinat: Record<string, [number, number]> = {
      sulteng: [119.8707, -1.43],
      sulut: [124.8464, 1.4748],
    }

    if (!koordinat[asal] || !koordinat[tujuan]) {
      return response.status(400).json({ error: 'Wilayah tidak dikenali' })
    }

    const coordinates = [koordinat[asal], koordinat[tujuan]]

    try {
      const result = await axios.post(
        'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
        { coordinates },
        {
          headers: {
            'Authorization': process.env.ORS_API_KEY || '',
            'Content-Type': 'application/json',
          },
        }
      )

      fs.mkdirSync(path.dirname(filePath), { recursive: true })
      fs.writeFileSync(filePath, JSON.stringify(result.data, null, 2))

      return response.status(200).json(result.data)
    } catch (error) {
      // fallback ke RoutingService jika gagal menggunakan axios langsung
      try {
        const ruteGeoJSON = await RoutingService.getRoute(asal, tujuan)
        return response.status(200).json(ruteGeoJSON)
      } catch (fallbackError) {
        return response.status(500).json({
          error: 'Gagal mengambil rute dari API',
          detail: fallbackError.message,
        })
      }
    }
  }
}
