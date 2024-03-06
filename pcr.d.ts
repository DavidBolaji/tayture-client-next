declare module 'puppeteer-chromium-resolver' {
  interface PCRStats {
    executablePath: string
    revision: string
  }

  type PCROptions = {}

  function PCR(options?: PCROptions): Promise<PCRStats>

  export = PCR
}
