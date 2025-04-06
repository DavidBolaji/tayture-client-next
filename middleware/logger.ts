import winston from 'winston'

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

// Add console logging in development
if (process.env.NEXT_PUBLIC_ENV !== 'prod') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  )
}
