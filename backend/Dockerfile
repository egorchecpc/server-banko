FROM node:18-alpine

EXPOSE 3000

WORKDIR /app

ADD ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
