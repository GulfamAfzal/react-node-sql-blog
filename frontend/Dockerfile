# Stage 1: Build the React application 
FROM node:18-alpine AS build 
WORKDIR /app 
COPY package*.json ./ 
RUN npm ci --legacy-peer-deps 
COPY . . 
 
# Pass the backend URL as a build argument [cite: 141, 142]
ARG REACT_APP_API_URL 
ENV REACT_APP_API_URL=$REACT_APP_API_URL 
 
RUN npm run build 
 
# Stage 2: Serve with Nginx [cite: 145, 146]
FROM nginx:alpine 
COPY --from=build /app/build /usr/share/nginx/html 
 
# Copy custom Nginx config (to support React Router) [cite: 148]
COPY nginx.conf /etc/nginx/conf.d/default.conf 
 
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]