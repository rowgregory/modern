import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  api: {
    bodyParser: {
      sizeLimit: '4mb' // or '10mb'
    }
  }
}

export default nextConfig
