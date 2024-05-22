import { app } from './app'
import { config } from './config'

export { app as privcoServer } from './app'

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${config.port}`)
})
