import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import userRoutes from './routes/userRoutes.js'
import { reportarConsulta, errorHandler } from './middleware/consultasMiddlewares.js'

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.use(reportarConsulta)

app.use(userRoutes)

app.use((req, res, next) => {
  const error = new Error('Ruta no encontrada')
  error.status = 404
  next(error)
})
app.use(errorHandler)

app.listen(PORT, console.log(`Server running on port http://localhost:${PORT}`))
