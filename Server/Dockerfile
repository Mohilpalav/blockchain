FROM golang:1.15

WORKDIR .
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

EXPOSE 3040

CMD ["BLOCKCHAIN"]
