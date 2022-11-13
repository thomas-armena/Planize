import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'MMM-DD-YYYY, hh:mm:ss a'
    }),
    format.json()
  ),
  transports: [new transports.Console({
    format: format.combine(
      format.timestamp({
        format: 'MMM-DD-YYYY, hh:mm:ss a'
      }),
      format.json(),
      format.colorize(),
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      format.printf(info => `[${[info.timestamp]}] ${info.level}: ${info.message}`)
    )
  })]
})

export default logger
