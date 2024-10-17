# Use uma imagem base, como o Node.js ou Python, dependendo do seu projeto
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do projeto para o diretório de trabalho
COPY . .

# Instale as dependências
RUN npm install

# Exponha a porta em que o aplicativo estará rodando
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]



