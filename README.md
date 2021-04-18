# Go Coverage HTML converter

Convert from coverage profile html to json for Go.

## Features
- [x] filename
- [x] value
- [x] coverage
- ...

## Usage

```sh
$ docker build -t go-coverage-html-converter:v0.0.1 .
$ docker run \
    -v $(pwd)/test/cover.html:/app/cover.html \
    go-coverage-html-converter:v0.0.1 | jq
[
  {
    "filename": "app/main.go",
    "value": "file0",
    "coverage": 28.6
  },
  {
    "filename": "app/sample.go",
    "value": "file1",
    "coverage": 0
  }
]
```
