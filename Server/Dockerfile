FROM golang:1.15

WORKDIR directory-to-change
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

EXPOSE 3040

CMD ["go", "run", "."]
