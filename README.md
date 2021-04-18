# Extract info from coverage html for Go

Extract information from coverage profile for Go.

```sh
$ docker build -t go-coverage-path-finder:v0.0.1 .
$ docker run \
    -v $(pwd)/test/cover.html:/app/cover.html \
    go-coverage-path-finder:<tag> | jq
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
