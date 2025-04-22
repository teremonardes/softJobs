export const reportarConsulta = (req, _, next) => {
  const url = req.originalUrl
  console.log(`
    📌 Consulta recibida:
    🗓️  Fecha: ${new Date().toLocaleString()}
    🔗 Ruta: ${url}
    ⚙️  Query:`, req.query)
  next()
}

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500
  console.error({
    error: err.message || 'Error interno del servidor',
    method: req.method,
    url: req.originalUrl
  })
  res.status(status).json({ error: err.message || 'Error interno del servidor' })
}
