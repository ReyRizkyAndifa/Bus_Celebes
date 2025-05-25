/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const RutesController = () => import('#controllers/rutes_controller')
const BusesController = () => import('#controllers/buses_controller')
const SessionController = () => import('#controllers/session_controller')
const TicketsController = () => import('#controllers/tickets_controller')
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/api/rute', [RutesController, 'index'])
router.post('/api/rute', [RutesController, 'index'])

// rute untuk Bus
router.get('/bus', [BusesController, 'index'])
router.get('/bus/:id', [BusesController, 'show'])
router
  .group(() => {
    router.post('/bus', [BusesController, 'store'])
    router.put('/bus/:id', [BusesController, 'update'])
    router.delete('/bus/:id', [BusesController, 'destroy'])
  })
  .use(middleware.auth({ guards: ['api'] }))

// rute untuk autentikasi
router.post('/register', [SessionController, 'register'])
router.post('/login', [SessionController, 'login'])
router.delete('/logout', [SessionController, 'logout']).use(middleware.auth({ guards: ['api'] }))

//tiket
// Semua route tiket dalam /api/tickets
router
  .group(() => {
    router.get('/tickets', [TicketsController, 'index'])
    router.get('/tickets/:id', [TicketsController, 'show'])
    router.post('/tickets', [TicketsController, 'store'])
    router.put('/tickets/:id', [TicketsController, 'update'])
    router.delete('/tickets/:id', [TicketsController, 'destroy'])
  })
  .prefix('/api')

  router.post('/tickets', [TicketsController, 'store'])



// Rute
router.get('/rute', [RutesController, 'index'])

//Get API