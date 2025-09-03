# ทำการเลือก base image (จาก docker hub) มาเป็นตัว runtime เริ่มต้น เพื่อให้สามารถ run project ได้
# ในทีนี้เราทำการเลือก node image version 18 ออกมา
FROM node:20-alpine


# setup timezone
ENV TZ=Asia/Bangkok


# กำหนด directory เริ่มต้นใน container (ตอน run ขึ้นมา)
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# ทำการปล่อย port 32001 ออกมาให้ access ได้
EXPOSE 32001

# กำหนด command สำหรับเริ่มต้น run application (ตอน run container)
CMD ["node", "api_third_party_impact_loading.js"]