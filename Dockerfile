# Use Node.js 23 on Alpine
FROM node:23-alpine

# Support native modules
RUN apk add --no-cache libc6-compat

# Create app directory
WORKDIR /app

# Copy package manifests 
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Re-generate Prisma Client with correct targets inside the container
RUN npx prisma generate

# Silence Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Expose the dev server port
EXPOSE 3000

# Default to the Next.js dev command
CMD ["npm", "run", "dev"]