FROM golang:1.15

WORKDIR YOUR/ABS/FILEPATH/HERE
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

EXPOSE 3040

CMD ["go", "run", "."]
