@echo 开始启动 server
start cmd /k "cd ./server && node index.js"

@echo 开始启动 client
start cmd /k "cd ./client && pnpm dev"
