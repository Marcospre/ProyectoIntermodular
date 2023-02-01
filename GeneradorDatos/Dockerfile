# Use an image de Node.js como base
FROM node:14

# Establecer la carpeta de trabajo
WORKDIR /app

# Copiar los archivos a la carpeta de trabajo
COPY . .

# Instalar las dependencias
RUN npm install

# Exponer el puerto predeterminado para la aplicación
EXPOSE 3000

# Ejecutar la aplicación
# CMD ["npm", "start"]
CMD [ "node","generate-data.js" ]