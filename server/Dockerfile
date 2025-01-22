# שלב 1: בניית התמונה
FROM node:16-alpine

# יצירת תיקיית עבודה
WORKDIR /app

# העתקת קבצי הפרויקט
COPY package*.json ./
COPY . .

# התקנת התלויות
RUN npm install

# פתיחת הפורט
EXPOSE 5000

# פקודת הרצה
CMD ["node", "server.js"]
