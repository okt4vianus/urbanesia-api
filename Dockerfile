# Use the official Bun image with Debian Linux
# Oven is the company name, the creator of Bun
FROM oven/bun:1.1

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy app files
COPY . .

# Install app dependencies
RUN bun install
RUN bun prisma migrate deploy
RUN bun prisma generate --no-hints
# or RUN bun build

# Expose the application port

# Run the application
CMD ["bun", "start"]