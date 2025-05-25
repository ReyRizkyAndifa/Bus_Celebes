import axios from 'axios'
// import Env from '@ioc:Adonis/Core/Env'
import { config } from 'dotenv'
config()

export default class RoutingService {
  private static coords: Record<string, [number, number]> = {
    sulteng: [119.8707, -1.43], // Palu
    sulut: [124.8464, 1.4748], // Manado
    sulsel: [119.4122, -5.1354], // Makassar
    sultra: [122.5165, -3.9917], // Kendari
    gorontalo: [123.0615, 0.5435], // Gorontalo
    sulbar: [118.8963, -2.6791], // Mamuju
  }

  public static async getRoute(asal: string, tujuan: string) {
    if (!(asal in this.coords) || !(tujuan in this.coords)) {
      throw new Error('Wilayah tidak dikenal')
    }

    const coordinates = [this.coords[asal], this.coords[tujuan]]

    const response = await axios.post(
      'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
      { coordinates },
      {
        headers: {
          'Authorization': process.env.ORS_API_KEY || '',
          'Content-Type': 'application/json',
        },
      }
    )

    return response.data // GeoJSON
  }
}
