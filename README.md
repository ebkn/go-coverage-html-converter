# Convert from coverage html to json for Go

Convert coverage profile html to json for Go.

## Features
- [x] filename
- [x] value
- [x] coverage
- ...

## Usage

```sh
$ docker build -t go-coverage-html-to-json:v0.0.1 .
$ docker run \
    -v $(pwd)/test/cover.html:/app/cover.html \
    go-coverage-html-to-json:<tag> | jq
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
