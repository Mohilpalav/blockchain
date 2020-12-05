FROM golang:1.15

WORKDIR C:\Users\MI\Google Drive\FALL2020\SE575\blockchain\Server
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

EXPOSE 3040

CMD ["go", "run", "."]
