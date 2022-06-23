@echo 开始启动 server
start cmd /k "node index.js"

@echo 开始启动 client
start cmd /k "cd ./client && pnpm dev"
